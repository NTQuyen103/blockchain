import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/auth.js';

/** Trang đăng ký */
export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try { await register(form); nav('/profile'); } catch (err) { setMsg(err.message); }
  };
  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <form onSubmit={submit} className="panel space-y-4 p-6">
        <h1 className="font-title text-3xl text-ink">Tạo tài khoản</h1>
        <input className="input" placeholder="Tên hiển thị" value={form.name} onChange={set('name')} />
        <input className="input" type="email" placeholder="Email" value={form.email} onChange={set('email')} />
        <input className="input" type="password" placeholder="Mật khẩu" value={form.password} onChange={set('password')} />
        {msg && <p role="alert" className="text-sm text-red-400">{msg}</p>}
        <button className="btn-arcane w-full">Đăng ký</button>
        <p className="text-center text-sm text-mute">Đã có tài khoản? <Link to="/login" className="text-gilt">Đăng nhập</Link></p>
      </form>
    </section>
  );
}
