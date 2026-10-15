/** Bảng màu & font theo thiết kế Visily: nền tối huyền bí, tím arcane, vàng gold */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Token theo giao diện sáng/tối – giá trị định nghĩa trong src/index.css
        void:  'rgb(var(--void) / <alpha-value>)',   // nền chính
        crypt: 'rgb(var(--crypt) / <alpha-value>)',  // nền thẻ/panel
        ink:   'rgb(var(--ink) / <alpha-value>)',    // chữ tiêu đề
        soft:  'rgb(var(--soft) / <alpha-value>)',   // chữ thường
        mute:  'rgb(var(--mute) / <alpha-value>)',   // chữ phụ
        faint: 'rgb(var(--faint) / <alpha-value>)',  // chữ mờ/placeholder
        line:  'rgb(var(--line) / <alpha-value>)',   // viền, đường kẻ
        gilt:  'rgb(var(--gilt) / <alpha-value>)',   // vàng dùng cho CHỮ (đậm hơn ở nền sáng)
        arcane: { DEFAULT: '#8b5cf6', dark: '#6d3fe0' },
        gold: { DEFAULT: '#f59e0b', soft: '#fbbf24' },
        rarity: { common: '#9ca3af', rare: '#3b82f6', epic: '#a855f7', legendary: '#f59e0b', mythic: '#ef4444' },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 24px rgba(139,92,246,.45)',
        gold: '0 0 24px rgba(245,158,11,.4)',
      },
    },
  },
  plugins: [],
};
