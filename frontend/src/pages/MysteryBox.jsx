import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BoxCard from '../components/BoxCard.jsx';
import NFTCard from '../components/NFTCard.jsx';
import { useWallet } from '../context/WalletContext.jsx';
import { fetchBoxes, openBox } from '../services/contract.js';
import { MOCK_MODE } from '../utils/constants.js';

const STATUS_TEXT = {
  confirm: 'Hãy xác nhận giao dịch trong MetaMask...',
  pending: 'Đang chờ block xác nhận, hộp đang rung chuyển...',
};

/** Luồng: chọn hộp → xác nhận MetaMask → chờ tx → hiện vật phẩm nhận được */
export default function MysteryBox() {
  const { boxId } = useParams();
  const { signer, isConnected, connect, wrongNetwork } = useWallet();
  const [boxes, setBoxes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | confirm | pending | done
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBoxes().then((b) => { setBoxes(b); if (boxId) setSelected(b.find((x) => x.id === Number(boxId)) || null); });
  }, [boxId]);

  const handleOpen = async () => {
    setError(''); setResult(null);
    try {
      const res = await openBox(signer, selected, setStatus);
      setResult(res);
    } catch (e) {
      // 4001 / ACTION_REJECTED: người dùng bấm Reject trong MetaMask
      setError(e.code === 'ACTION_REJECTED' || e.code === 4001 ? 'Bạn đã huỷ giao dịch.' : 'Giao dịch thất bại. Kiểm tra số dư ETH và thử lại.');
      setStatus('idle');
    }
  };
  const busy = status === 'confirm' || status === 'pending';
  const canBuy = selected && !busy && !wrongNetwork && (MOCK_MODE || isConnected);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-title text-4xl text-ink">Mở hộp mù</h1>
      {MOCK_MODE && <p className="mt-2 text-xs text-amber-400">Chế độ mock: chưa cấu hình contract, giao dịch được giả lập.</p>}

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {boxes.map((b) => <BoxCard key={b.id} box={b} selected={selected?.id === b.id} onSelect={setSelected} />)}
      </div>

      {selected && (
        <div className="panel mt-8 flex flex-wrap items-center justify-between gap-4 p-5">
          <div><p className="text-sm text-mute">Bạn chọn</p><p className="font-title text-2xl text-ink">{selected.name}</p></div>
          {!isConnected && !MOCK_MODE
            ? <button className="btn-arcane" onClick={connect}>Connect Wallet để tiếp tục</button>
            : <button className="btn-gold" disabled={!canBuy} onClick={handleOpen}>{busy ? 'Đang xử lý...' : `Mở hộp · ${selected.price} ETH`}</button>}
        </div>
      )}

      {busy && (
        <div className="mt-8 text-center">
          <div className="animate-shake mx-auto h-32 w-32 rounded-2xl bg-gradient-to-br from-arcane to-gold shadow-glow" />
          <p className="mt-4 text-soft" role="status">{STATUS_TEXT[status]}</p>
        </div>
      )}
      {error && <p role="alert" className="mt-6 text-red-400">{error}</p>}

      {result && (
        <div className="mx-auto mt-10 max-w-xs">
          <h2 className="font-title mb-4 text-center text-2xl text-gilt">Bạn nhận được!</h2>
          <NFTCard nft={result.item} />
          <p className="mt-3 break-all text-center font-mono text-[11px] text-faint">Tx: {result.txHash}</p>
        </div>
      )}
    </section>
  );
}
