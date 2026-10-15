import { useTheme } from '../context/ThemeContext.jsx';

/** Nút chuyển giao diện sáng / tối */
export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button onClick={toggle} className="btn-ghost !px-3" aria-label={isDark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'} title={isDark ? 'Giao diện sáng' : 'Giao diện tối'}>
      <span aria-hidden="true">{isDark ? '☀️' : '🌙'}</span>
    </button>
  );
}
