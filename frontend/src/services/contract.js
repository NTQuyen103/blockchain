import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, MOCK_MODE } from '../utils/constants.js';
import { MOCK_BOXES, MOCK_NFTS, MOCK_LOOT_TABLE } from './mockData.js';

/**
 * ABI tối giản – KHỚP với Smart Contract dự kiến (ERC721Enumerable).
 * Khi contract thật có tên hàm khác, chỉ cần sửa ABI + các hàm bên dưới.
 */
export const ABI = [
  'function boxPrice(uint256 boxId) view returns (uint256)',
  'function openBox(uint256 boxId) payable returns (uint256 tokenId)',
  'function balanceOf(address owner) view returns (uint256)',
  'function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)',
  'function ownerOf(uint256 tokenId) view returns (address)',
  'function getItem(uint256 tokenId) view returns (string name, uint8 rarity, uint16 level, string cls, uint16 power, uint16 durability)',
  'event BoxOpened(address indexed player, uint256 indexed boxId, uint256 tokenId)',
];
const RARITY_BY_INDEX = ['common', 'rare', 'epic', 'legendary', 'mythic'];

/** Tạo instance contract (cần signer để gửi giao dịch, provider để chỉ đọc) */
const getContract = (signerOrProvider) => new ethers.Contract(CONTRACT_ADDRESS, ABI, signerOrProvider);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Danh sách hộp (hiện lấy từ mock; sau này gọi Backend/contract) */
export async function fetchBoxes() {
  return MOCK_BOXES;
}

/**
 * Mở hộp mù: MetaMask sẽ hiện popup xác nhận giao dịch.
 * @param {ethers.Signer} signer  signer từ WalletContext
 * @param {object} box            hộp được chọn
 * @param {(s:string)=>void} onStatus  callback cập nhật trạng thái: 'confirm' | 'pending' | 'done'
 */
export async function openBox(signer, box, onStatus = () => {}) {
  if (MOCK_MODE) {
    onStatus('confirm'); await sleep(900);
    onStatus('pending'); await sleep(1800);
    onStatus('done');
    // Giả lập quay tỷ lệ rơi theo loot table
    const roll = Math.random() * 100; let acc = 0, rarity = 'common';
    for (const r of MOCK_LOOT_TABLE) { acc += r.rate; if (roll <= acc) { rarity = r.rarity; break; } }
    const pool = MOCK_NFTS.filter((n) => n.rarity === rarity);
    const item = pool[Math.floor(Math.random() * pool.length)] || MOCK_NFTS[0];
    return { txHash: '0xMOCK' + Date.now().toString(16), item };
  }
  const c = getContract(signer);
  onStatus('confirm');
  const tx = await c.openBox(box.id, { value: ethers.parseEther(String(box.price)) }); // popup MetaMask
  onStatus('pending');
  const receipt = await tx.wait();
  onStatus('done');
  // Đọc tokenId từ event BoxOpened
  const log = receipt.logs.map((l) => { try { return c.interface.parseLog(l); } catch { return null; } })
    .find((e) => e?.name === 'BoxOpened');
  const item = await fetchNftById(signer.provider, log.args.tokenId);
  return { txHash: receipt.hash, item };
}

/** Lấy thông tin 1 NFT theo tokenId */
export async function fetchNftById(provider, tokenId) {
  const c = getContract(provider);
  const [owner, it] = await Promise.all([c.ownerOf(tokenId), c.getItem(tokenId)]);
  return {
    tokenId: Number(tokenId), owner, name: it.name, rarity: RARITY_BY_INDEX[Number(it.rarity)],
    level: Number(it.level), cls: it.cls, power: Number(it.power), durability: Number(it.durability),
    image: `https://picsum.photos/seed/nft${tokenId}/400/500`, // TODO: thay bằng tokenURI/IPFS
  };
}

/** Lấy danh sách NFT của 1 địa chỉ ví */
export async function fetchOwnedNfts(provider, address) {
  if (MOCK_MODE) { await sleep(400); return MOCK_NFTS.map((n) => ({ ...n, owner: address })); }
  const c = getContract(provider);
  const n = Number(await c.balanceOf(address));
  const ids = await Promise.all(Array.from({ length: n }, (_, i) => c.tokenOfOwnerByIndex(address, i)));
  return Promise.all(ids.map((id) => fetchNftById(provider, id)));
}
