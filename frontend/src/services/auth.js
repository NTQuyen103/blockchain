/**
 * Dịch vụ xác thực – hiện GIẢ LẬP bằng localStorage (chưa có Backend).
 * Khi có backend: thay thân hàm bằng fetch tới /api/auth/... và lưu JWT.
 * Không lưu mật khẩu ở client.
 */
const KEY = 'mb_user';
const check = ({ email, password }) => {
  if (!/\S+@\S+\.\S+/.test(email)) throw new Error('Email không hợp lệ.');
  if ((password || '').length < 6) throw new Error('Mật khẩu cần tối thiểu 6 ký tự.');
};
const save = (u) => { localStorage.setItem(KEY, JSON.stringify(u)); return u; };

export const getCurrentUser = () => JSON.parse(localStorage.getItem(KEY) || 'null');
export async function login(data) { check(data); /* TODO: POST /api/auth/login */ return save({ name: data.email.split('@')[0], email: data.email }); }
export async function register(data) { check(data); /* TODO: POST /api/auth/register */ return save({ name: data.name || data.email.split('@')[0], email: data.email }); }
export const updateProfile = (patch) => save({ ...getCurrentUser(), ...patch });
export const logout = () => localStorage.removeItem(KEY);
