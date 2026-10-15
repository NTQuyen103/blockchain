import RarityBadge from './RarityBadge.jsx';
import { RARITIES } from '../utils/constants.js';
import { shortAddr } from '../utils/format.js';

/** Thẻ vật phẩm NFT: ảnh, độ hiếm, level, sức mạnh, thanh độ bền */
export default function NFTCard({ nft, showOwner = false }) {
  const color = (RARITIES[nft.rarity] || RARITIES.common).color;
  return (
    <article className="panel overflow-hidden transition hover:-translate-y-1" style={{ boxShadow: `0 0 0 1px ${color}55, 0 10px 30px -12px ${color}88` }}>
      <div className="relative aspect-[4/5]">
        <img src={nft.image} alt={nft.name} className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-crypt via-transparent" />
        <div className="absolute left-3 top-3 flex items-center gap-2"><RarityBadge rarity={nft.rarity} />
          <span className="rounded bg-black/70 px-2 py-0.5 text-[10px] font-bold text-white">LV.{nft.level}</span></div>
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-xs font-semibold uppercase text-gilt">{nft.cls}</p>
          <h3 className="font-title text-lg leading-tight text-ink">{nft.name}</h3>
        </div>
      </div>
      <div className="space-y-2 p-4 text-xs text-mute">
        <div className="flex justify-between"><span>Token #{nft.tokenId}</span><span className="text-gilt">⚔ {nft.power}</span></div>
        {showOwner && <div className="font-mono">Chủ sở hữu: {shortAddr(nft.owner)}</div>}
        <div>Độ bền
          <div className="mt-1 h-1.5 rounded bg-line/10"><div className="h-full rounded bg-blue-500" style={{ width: `${nft.durability}%` }} /></div>
        </div>
        <button className="btn-ghost w-full">✦ Nâng cấp</button>
      </div>
    </article>
  );
}
