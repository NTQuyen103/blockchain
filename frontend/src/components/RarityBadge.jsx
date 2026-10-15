import { RARITIES } from '../utils/constants.js';
/** Nhãn độ hiếm có màu */
export default function RarityBadge({ rarity }) {
  const r = RARITIES[rarity] || RARITIES.common;
  return <span className="rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black" style={{ background: r.color }}>{r.label}</span>;
}
