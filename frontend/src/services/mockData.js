// Dữ liệu giả lập – thay bằng API Backend / Smart Contract khi sẵn sàng.
const img = (s, w = 400, h = 500) => `https://picsum.photos/seed/${s}/${w}/${h}`;

export const MOCK_BOXES = [
  { id: 1, name: 'Hòm Gỗ Cổ Đại', tier: 'common',    price: 0.05, stock: 120, image: img('woodchest'), desc: 'Vật phẩm phổ thông, tỷ lệ Hiếm 20%.' },
  { id: 2, name: 'Hòm Bạc Thần Bí', tier: 'rare',     price: 0.15, stock: 45,  image: img('silverchest'), desc: 'Đảm bảo tối thiểu 1 vật phẩm Hiếm.' },
  { id: 3, name: 'Hòm Vàng Đế Vương', tier: 'legendary', price: 0.5, stock: 12, image: img('goldchest'), desc: 'Cơ hội cao nhận vật phẩm Huyền thoại.' },
];

// Tỷ lệ rơi (tổng 100%) – trang Admin cho phép chỉnh
export const MOCK_LOOT_TABLE = [
  { rarity: 'common', rate: 55 }, { rarity: 'rare', rate: 25 }, { rarity: 'epic', rate: 12 },
  { rarity: 'legendary', rate: 7 }, { rarity: 'mythic', rate: 1 },
];

export const MOCK_NFTS = [
  { tokenId: 1001, name: 'Chiến Binh Rừng Sâu', rarity: 'epic',      level: 42, cls: 'Warrior', power: 850,  durability: 90, image: img('warrior') },
  { tokenId: 1002, name: 'Pháp Sư Tinh Tú',     rarity: 'legendary', level: 50, cls: 'Mage',    power: 1200, durability: 75, image: img('mage') },
  { tokenId: 1003, name: 'Sát Thủ Bóng Đêm',    rarity: 'rare',      level: 35, cls: 'Rogue',   power: 720,  durability: 88, image: img('rogue') },
  { tokenId: 1004, name: 'Hộ Vệ Hoàng Gia',     rarity: 'common',    level: 20, cls: 'Tank',    power: 450,  durability: 95, image: img('tank') },
  { tokenId: 1005, name: 'Phù Thủy Huyết Tộc',  rarity: 'mythic',    level: 65, cls: 'Mage',    power: 2100, durability: 60, image: img('witch') },
  { tokenId: 1006, name: 'Cung Thủ Phong Ấn',   rarity: 'epic',      level: 48, cls: 'Archer',  power: 980,  durability: 82, image: img('archer') },
];

export const MOCK_ADMIN_STATS = [
  { label: 'Doanh thu', value: '12.45 ETH', delta: '+14%' },
  { label: 'Hộp đã mở', value: '1,284',     delta: '+8.2%' },
  { label: 'Người dùng', value: '432',      delta: '+21%' },
  { label: 'Tỷ lệ hiếm', value: '12.4%',    delta: '-2.4%' },
];

export const MOCK_ACTIVITY = [
  { text: 'Mở Hộp Pha Lê Tối Thượng', sub: 'Master_X rớt Chiến Binh Ánh Trăng (Bậc S)', time: '2 phút trước' },
  { text: 'Giao dịch niêm yết mới',   sub: 'Night_Raven: Kiếm Ánh Sáng - 0.45 ETH',    time: '15 phút trước' },
  { text: 'Nâng cấp vật phẩm thành công', sub: 'Eldritch_Lord: Khiên Rồng Lửa đạt LV.50', time: '45 phút trước' },
  { text: 'Phát hiện đăng nhập lạ',   sub: 'Unknown_IP: Hệ thống đã chặn truy cập',     time: '1 giờ trước' },
];
