import { NavLink, Link } from 'react-router-dom';
import ConnectButton from './ConnectButton.jsx';
import ThemeToggle from './ThemeToggle.jsx';

const LINKS = [
  { to: '/', label: 'Trang chủ' },
  { to: '/mystery-box', label: 'Mystery Box' },
  { to: '/collection', label: 'Kho đồ' },
  { to: '/admin', label: 'Quản trị' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/10 bg-void/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-2 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-ink">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-arcane shadow-glow">👻</span>MystiBox NFT
        </Link>
        <nav className="flex gap-6 text-sm">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'}
              className={({ isActive }) => (isActive ? 'text-gilt' : 'text-mute hover:text-ink')}>{l.label}</NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <Link to="/login" className="text-sm text-soft hover:text-ink">Đăng nhập</Link>
          <Link to="/register" className="text-sm text-soft hover:text-ink">Đăng ký</Link>
          <ThemeToggle />
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}
