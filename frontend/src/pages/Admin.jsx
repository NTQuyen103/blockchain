import { useState } from 'react';
import RarityBadge from '../components/RarityBadge.jsx';
import { MOCK_BOXES, MOCK_ADMIN_STATS, MOCK_ACTIVITY, MOCK_LOOT_TABLE, MOCK_NFTS } from '../services/mockData.js';
import { RARITIES } from '../utils/constants.js';

/**
 * Trang quản trị (chỉ Frontend, dữ liệu mock).
 * TODO: bảo vệ route bằng quyền admin (kiểm tra owner() của contract hoặc role từ Backend).
 */
export default function Admin() {
  const [tab, setTab] = useState('boxes');
  const [boxes, setBoxes] = useState(MOCK_BOXES);
  const [loot, setLoot] = useState(MOCK_LOOT_TABLE);
  const total = loot.reduce((s, r) => s + Number(r.rate), 0);
  const updateRate = (i, v) => setLoot(loot.map((r, idx) => (idx === i ? { ...r, rate: Number(v) } : r)));
  const addBox = () => setBoxes([...boxes, { id: Date.now(), name: 'Hòm mới', tier: 'common', price: 0.01, stock: 0, image: 'https://picsum.photos/seed/new/100/100' }]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><h1 className="font-title text-4xl text-ink">Quản trị hệ thống</h1>
          <p className="text-sm text-mute">Quản lý hộp, vật phẩm và tỷ lệ xuất hiện.</p></div>
        <button className="btn-arcane" onClick={addBox}>＋ Đúc hộp mới</button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MOCK_ADMIN_STATS.map((s) => (
          <div key={s.label} className="panel p-4">
            <p className="text-xs text-mute">{s.label}</p>
            <p className="font-title mt-1 text-3xl text-ink">{s.value}</p>
            <span className={`text-xs ${s.delta.startsWith('-') ? 'text-red-400' : 'text-emerald-400'}`}>{s.delta}</span>
          </div>))}
      </div>

      <div className="mt-8 flex gap-2">
        {[['boxes', 'Quản lý hộp'], ['items', 'Kho NFT'], ['rates', 'Tỷ lệ xuất hiện']].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className={tab === k ? 'btn-arcane' : 'btn-ghost'}>{l}</button>))}
      </div>

      <div className="panel mt-4 overflow-x-auto p-4">
        {tab === 'boxes' && (
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-xs uppercase text-faint"><tr><th>Hộp</th><th>Độ hiếm</th><th>Giá</th><th>Số lượng</th><th>Trạng thái</th><th /></tr></thead>
            <tbody>{boxes.map((b) => (
              <tr key={b.id} className="border-t border-line/10">
                <td className="flex items-center gap-3 py-3"><img src={b.image} alt="" className="h-10 w-10 rounded object-cover" />{b.name}</td>
                <td><RarityBadge rarity={b.tier} /></td>
                <td className="text-gilt">{b.price} ETH</td><td>{b.stock}</td>
                <td className={b.stock ? 'text-emerald-400' : 'text-red-400'}>{b.stock ? 'Đang bán' : 'Hết hàng'}</td>
                <td><button className="text-red-400 hover:underline" onClick={() => setBoxes(boxes.filter((x) => x.id !== b.id))}>Xoá</button></td>
              </tr>))}</tbody>
          </table>)}

        {tab === 'items' && (
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="text-xs uppercase text-faint"><tr><th>Token</th><th>Tên</th><th>Độ hiếm</th><th>Lớp</th><th>Sức mạnh</th></tr></thead>
            <tbody>{MOCK_NFTS.map((n) => (
              <tr key={n.tokenId} className="border-t border-line/10"><td className="py-3 font-mono">#{n.tokenId}</td><td>{n.name}</td>
                <td><RarityBadge rarity={n.rarity} /></td><td>{n.cls}</td><td>{n.power}</td></tr>))}</tbody>
          </table>)}

        {tab === 'rates' && (
          <div className="space-y-4">
            {loot.map((r, i) => (
              <label key={r.rarity} className="flex items-center gap-4 text-sm">
                <span className="w-28" style={{ color: RARITIES[r.rarity].color }}>{RARITIES[r.rarity].label}</span>
                <input type="range" min="0" max="100" value={r.rate} onChange={(e) => updateRate(i, e.target.value)} className="flex-1 accent-violet-500" />
                <span className="w-12 text-right">{r.rate}%</span>
              </label>))}
            <p className={total === 100 ? 'text-emerald-400' : 'text-red-400'}>Tổng: {total}% {total !== 100 && '(phải bằng 100%)'}</p>
            {/* TODO: gọi contract.setLootTable(...) hoặc API Backend khi lưu */}
            <button className="btn-gold" disabled={total !== 100} onClick={() => alert('Đã lưu (mock)')}>Lưu cấu hình</button>
          </div>)}
      </div>

      <div className="panel mt-6 p-4">
        <h2 className="font-title mb-3 text-xl text-ink">Nhật ký biến động</h2>
        <ul className="divide-y divide-line/10 text-sm">
          {MOCK_ACTIVITY.map((a) => (
            <li key={a.text} className="flex justify-between gap-4 py-3"><div><p className="font-semibold text-ink">{a.text}</p><p className="text-xs text-mute">{a.sub}</p></div><span className="shrink-0 text-xs text-faint">{a.time}</span></li>))}
        </ul>
      </div>
    </section>
  );
}
