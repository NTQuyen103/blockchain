import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getCurrentUser, updateProfile, logout } from '../services/auth.js';
import { useWallet } from '../context/WalletContext.jsx';
import { shortAddr } from '../utils/format.js';

/** Quản lý thông tin tài khoản + ví liên kết */
export default function Profile() {
  const nav = useNavigate();
  const { account } = useWallet();
  const [user, setUser] = useState(getCurrentUser());
  if (!user) return <Navigate to="/login" replace />;
  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <div className="panel space-y-3 p-6">
        <h1 className="font-title text-3xl text-ink">Tài khoản</h1>
        <input className="input" aria-label="Tên hiển thị" value={user.name} onChange={(e) => setUser(updateProfile({ name: e.target.value }))} />
        <p className="text-sm text-mute">Email: {user.email}</p>
        <p className="text-sm text-mute">Ví liên kết: <span className="font-mono text-gilt">{account ? shortAddr(account) : 'Chưa kết nối'}</span></p>
        <button className="btn-ghost w-full" onClick={() => { logout(); nav('/login'); }}>Đăng xuất</button>
      </div>
    </section>
  );
}
