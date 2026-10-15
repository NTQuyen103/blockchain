import { useEffect, useMemo, useState } from 'react';
import NFTCard from '../components/NFTCard.jsx';
import { useWallet } from '../context/WalletContext.jsx';
import { fetchOwnedNfts } from '../services/contract.js';
import { MOCK_MODE, RARITIES } from '../utils/constants.js';

/** Kho đồ: grid NFT của ví + lọc theo độ hiếm, mã token, địa chỉ chủ sở hữu */
export default function Inventory() {
  const { provider, account, isConnected, connect } = useWallet();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rarity, setRarity] = useState('all');
  const [tokenQ, setTokenQ] = useState('');
  const [ownerQ, setOwnerQ] = useState('');

  useEffect(() => {
    if (!isConnected && !MOCK_MODE) return;
    setLoading(true);
    fetchOwnedNfts(provider, account || '0x0000000000000000000000000000000000000000').then(setItems).finally(() => setLoading(false));
  }, [provider, account, isConnected]);

  const filtered = useMemo(() => items.filter((n) =>
    (rarity === 'all' || n.rarity === rarity) &&
    String(n.tokenId).includes(tokenQ.trim()) &&
    n.owner.toLowerCase().includes(ownerQ.trim().toLowerCase())), [items, rarity, tokenQ, ownerQ]);

  if (!isConnected && !MOCK_MODE)
    return <div className="py-24 text-center"><p className="mb-4 text-mute">Kết nối ví để xem kho đồ của bạn.</p><button className="btn-arcane" onClick={connect}>Connect Wallet</button></div>;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-title text-4xl text-ink">Kho đồ cá nhân</h1>
      <p className="mt-1 text-sm text-mute">Hiện vật sở hữu: <b className="text-arcane">{items.length}</b></p>

      <div className="panel mt-6 grid gap-3 p-4 md:grid-cols-4">
        <select className="input" value={rarity} onChange={(e) => setRarity(e.target.value)} aria-label="Lọc độ hiếm">
          <option value="all">Mọi độ hiếm</option>
          {Object.entries(RARITIES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <input className="input" placeholder="Mã token (vd: 1002)" value={tokenQ} onChange={(e) => setTokenQ(e.target.value)} />
        <input className="input md:col-span-2" placeholder="Địa chỉ chủ sở hữu (0x...)" value={ownerQ} onChange={(e) => setOwnerQ(e.target.value)} />
      </div>

      {loading ? <p className="py-16 text-center text-mute">Đang tải vật phẩm...</p>
        : filtered.length === 0 ? <p className="py-16 text-center text-mute">Không có vật phẩm phù hợp. Hãy đổi bộ lọc hoặc mở thêm hộp.</p>
        : <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{filtered.map((n) => <NFTCard key={n.tokenId} nft={n} showOwner />)}</div>}
    </section>
  );
}
