import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);

/**
 * Quản lý giao diện sáng/tối.
 * - Lần đầu: theo cài đặt hệ điều hành; sau đó nhớ lựa chọn trong localStorage.
 * - Áp dụng bằng class "light" trên <html> (biến màu ở index.css).
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains('light') ? 'light' : 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    try { localStorage.setItem('mb_theme', theme); } catch { /* bỏ qua nếu bị chặn storage */ }
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);
  return <ThemeContext.Provider value={{ theme, setTheme, toggle }}>{children}</ThemeContext.Provider>;
}
