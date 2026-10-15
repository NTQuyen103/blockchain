import { Link } from 'react-router-dom';
import RarityBadge from './RarityBadge.jsx';
import { fmtEth } from '../utils/format.js';

/** Thẻ hộp mù – dùng ở Trang chủ & trang Mở hộp */
export default function BoxCard({ box, onSelect, selected }) {
  const gold = box.tier === 'legendary';
  return (
    <article className={`panel overflow-hidden p-4 ${selected ? 'ring-2 ring-gold' : ''}`}>
      <div className="relative">
        <img src={box.image} alt={box.name} className="aspect-square w-full rounded-xl object-cover" loading="lazy" />
        <div className="absolute left-2 top-2"><RarityBadge rarity={box.tier} /></div>
      </div>
      <h3 className="font-title mt-3 text-xl text-ink">{box.name}</h3>
      <p className="text-xs text-mute">{box.desc}</p>
      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="font-bold text-gilt">◆ {fmtEth(box.price)}</span><span className="text-faint">Còn {box.stock}</span>
      </div>
      {onSelect
        ? <button onClick={() => onSelect(box)} className={`${gold ? 'btn-gold' : 'btn-arcane'} mt-3 w-full`}>Chọn hộp</button>
        : <Link to={`/mystery-box/${box.id}`} className={`${gold ? 'btn-gold' : 'btn-arcane'} mt-3 w-full`}>Mua ngay</Link>}
    </article>
  );
}
