# MystiBox NFT – Frontend

React + Vite + Tailwind CSS + ethers v6 + MetaMask.

## Chạy
```bash
npm install
cp .env.example .env   # để trống VITE_CONTRACT_ADDRESS = chế độ mock
npm run dev
```

## Cấu trúc
- `src/context/WalletContext.jsx` – kết nối MetaMask (BrowserProvider, signer, sự kiện đổi ví/mạng)
- `src/services/contract.js` – ABI + `openBox`, `fetchOwnedNfts` (nơi duy nhất gọi Smart Contract)
- `src/services/mockData.js` – dữ liệu giả lập, thay bằng API Backend sau
- `src/pages/` – Home, Login, Register, Profile, MysteryBox, Inventory, Admin
- `src/components/` – Navbar, ConnectButton, NFTCard, BoxCard, ...

## Tích hợp thật
1. Deploy contract, điền `VITE_CONTRACT_ADDRESS`, `VITE_CHAIN_ID` vào `.env`.
2. Sửa `ABI` trong `utils/contract.js` cho khớp contract.
3. Thay `fetchBoxes`, Auth và Admin bằng gọi API Backend.
Không lưu seed phrase/private key: mọi giao dịch được ký trong MetaMask.
