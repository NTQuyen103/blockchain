// Cấu hình chung – đọc từ file .env (xem .env.example)
export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '';
export const CHAIN_ID = Number(import.meta.env.VITE_CHAIN_ID || 11155111);
// Không có địa chỉ contract => chạy MOCK để dev giao diện
export const MOCK_MODE = !CONTRACT_ADDRESS;

// Màu & nhãn theo độ hiếm (dùng cho NFTCard, filter, admin)
export const RARITIES = {
  common:    { label: 'Thường',      color: '#9ca3af' },
  rare:      { label: 'Hiếm',        color: '#3b82f6' },
  epic:      { label: 'Sử thi',      color: '#a855f7' },
  legendary: { label: 'Huyền thoại', color: '#f59e0b' },
  mythic:    { label: 'Thần thoại',  color: '#ef4444' },
};
