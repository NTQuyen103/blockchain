import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/auth.js';

/** Trang đăng nhập */
export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try { await login(form); nav('/profile'); } catch (err) { setMsg(err.message); }
  };
  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <form onSubmit={submit} className="panel space-y-4 p-6">
        <h1 className="font-title text-3xl text-ink">Đăng nhập</h1>
        <input className="input" type="email" placeholder="Email" value={form.email} onChange={set('email')} />
        <input className="input" type="password" placeholder="Mật khẩu" value={form.password} onChange={set('password')} />
        {msg && <p role="alert" className="text-sm text-red-400">{msg}</p>}
        <button className="btn-arcane w-full">Đăng nhập</button>
        <p className="text-center text-sm text-mute">Chưa có tài khoản? <Link to="/register" className="text-gilt">Đăng ký</Link></p>
      </form>
    </section>
  );
}
