import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BoxCard from '../components/BoxCard.jsx';
import NFTCard from '../components/NFTCard.jsx';
import { useWallet } from '../context/WalletContext.jsx';
import { fetchBoxes } from '../services/contract.js';
import { MOCK_NFTS } from '../services/mockData.js';
import { shortAddr } from '../utils/format.js';

export default function Home() {
  const { isConnected, account, balance, connect } = useWallet();
  const [boxes, setBoxes] = useState([]);
  useEffect(() => { fetchBoxes().then(setBoxes); }, []);

  return (
    <>
      {/* Hero + trạng thái ví */}
      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,#3b1d8f66,transparent_60%)]">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <h1 className="font-title max-w-2xl text-5xl leading-tight text-ink md:text-6xl">Khai phá sức mạnh của các vị thần</h1>
          <p className="mt-5 max-w-xl text-mute">Mỗi chiếc hộp chứa đựng linh hồn chiến binh huyền thoại sẵn sàng phục vụ dưới trướng của bạn.</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/mystery-box" className="btn-arcane">Khám phá ngay</Link>
            {isConnected
              ? <div className="panel px-4 py-2 font-mono text-sm">Ví: <span className="text-gilt">{shortAddr(account)}</span> · {Number(balance).toFixed(3)} ETH</div>
              : <button onClick={connect} className="btn-ghost">Connect Wallet</button>}
          </div>
          <dl className="panel mt-10 grid max-w-md grid-cols-3 p-4 text-center">
            {[['2.5K+', 'Hộp đã mở'], ['1.2K+', 'Vật phẩm hiếm'], ['$4.5M', 'Giao dịch']].map(([v, l]) => (
              <div key={l}><dd className="font-title text-2xl text-gilt">{v}</dd><dt className="text-[11px] text-faint">{l}</dt></div>))}
          </dl>
        </div>
      </section>

      {/* Hộp mù */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="font-title mb-6 text-3xl text-ink">Mở hộp kho báu</h2>
        <div className="grid gap-6 md:grid-cols-3">{boxes.map((b) => <BoxCard key={b.id} box={b} />)}</div>
      </section>

      {/* Bộ sưu tập nổi bật */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="font-title mb-6 text-3xl text-ink">Vật phẩm huyền thoại</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_NFTS.filter((n) => ['legendary', 'mythic', 'epic'].includes(n.rarity)).slice(0, 3).map((n) => <NFTCard key={n.tokenId} nft={n} />)}
        </div>
      </section>
    </>
  );
}
