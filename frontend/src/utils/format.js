// Rút gọn địa chỉ ví: 0x1234...abcd
export const shortAddr = (a = '') => (a ? `${a.slice(0, 6)}...${a.slice(-4)}` : '');
export const fmtEth = (v) => `${Number(v).toLocaleString('en-US', { maximumFractionDigits: 4 })} ETH`;
