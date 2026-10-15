import { useWallet } from '../context/WalletContext.jsx';
import { shortAddr } from '../utils/format.js';

/** Nút “Connect Wallet”: chưa kết nối → hiện nút; đã kết nối → hiện địa chỉ + số dư */
export default function ConnectButton() {
  const { account, balance, connect, disconnect, connecting, isConnected, wrongNetwork, switchNetwork } = useWallet();
  if (wrongNetwork) return <button className="btn-gold" onClick={switchNetwork}>Sai mạng – chuyển mạng</button>;
  if (!isConnected)
    return <button className="btn-arcane" onClick={connect} disabled={connecting}>{connecting ? 'Đang kết nối...' : 'Connect Wallet'}</button>;
  return (
    <button className="btn-ghost font-mono" onClick={disconnect} title="Bấm để ngắt kết nối">
      <span className="h-2 w-2 rounded-full bg-emerald-400" />
      {shortAddr(account)} · {Number(balance).toFixed(3)} ETH
    </button>
  );
}
