import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { BrowserProvider, formatEther } from 'ethers';
import { CHAIN_ID } from '../utils/constants.js';

const WalletContext = createContext(null);
export const useWallet = () => useContext(WalletContext);

/**
 * Quản lý kết nối MetaMask cho toàn app.
 * Chỉ dùng window.ethereum – KHÔNG bao giờ lưu seed phrase / private key.
 */
export function WalletProvider({ children }) {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('0');
  const [chainId, setChainId] = useState(null);
  const [signer, setSigner] = useState(null);
  const [provider, setProvider] = useState(null);
  const [error, setError] = useState('');
  const [connecting, setConnecting] = useState(false);

  // Làm mới thông tin ví từ các tài khoản MetaMask trả về
  const sync = useCallback(async (accounts) => {
    if (!accounts?.length) { setAccount(''); setSigner(null); setBalance('0'); return; }
    const p = new BrowserProvider(window.ethereum);
    const s = await p.getSigner();
    const net = await p.getNetwork();
    setProvider(p); setSigner(s); setAccount(accounts[0]); setChainId(Number(net.chainId));
    setBalance(formatEther(await p.getBalance(accounts[0])));
  }, []);

  /** Gọi khi bấm nút “Connect Wallet” */
  const connect = useCallback(async () => {
    setError('');
    if (!window.ethereum) { setError('Chưa cài MetaMask. Hãy cài tiện ích tại metamask.io.'); return; }
    try {
      setConnecting(true);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      await sync(accounts);
    } catch (e) {
      setError(e.code === 4001 ? 'Bạn đã từ chối kết nối ví.' : 'Không thể kết nối ví.');
    } finally { setConnecting(false); }
  }, [sync]);

  /** Chuyển mạng MetaMask sang chain của contract */
  const switchNetwork = useCallback(async () => {
    await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0x' + CHAIN_ID.toString(16) }] });
  }, []);

  // Tự kết nối lại nếu đã cấp quyền trước đó + lắng nghe đổi tài khoản/mạng
  useEffect(() => {
    if (!window.ethereum) return;
    window.ethereum.request({ method: 'eth_accounts' }).then(sync).catch(() => {});
    const onAcc = (a) => sync(a);
    const onChain = () => window.location.reload(); // khuyến nghị của MetaMask
    window.ethereum.on('accountsChanged', onAcc);
    window.ethereum.on('chainChanged', onChain);
    return () => { window.ethereum.removeListener('accountsChanged', onAcc); window.ethereum.removeListener('chainChanged', onChain); };
  }, [sync]);

  const value = useMemo(() => ({
    account, balance, chainId, signer, provider, error, connecting,
    isConnected: !!account, wrongNetwork: !!chainId && chainId !== CHAIN_ID,
    connect, switchNetwork, disconnect: () => sync([]),
  }), [account, balance, chainId, signer, provider, error, connecting, connect, switchNetwork, sync]);

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}
