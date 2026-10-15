# MystiBoxNFT
- `frontend/`   – React + Vite + Tailwind + ethers (chạy: `npm install && npm run dev`)
- `backend/`    – Express (khung)
- `blockchain/` – Hardhat (khung). Sau khi deploy, điền địa chỉ vào `frontend/.env` (VITE_CONTRACT_ADDRESS)


///
chạy frontend:
cd MystiBoxNFT/frontend
npm install
cp .env.example .env
npm run dev

///
git status                      # xem file nào đã thay đổi
git add .                       # đưa mọi thay đổi vào lần lưu
git commit -m "Mô tả ngắn việc đã sửa"
git push                        # đẩy lên GitHub, Vercel tự build lại

git checkout -b feature/ten-tinh-nang   # tạo nhánh mới và chuyển sang đó
# ...sửa code, rồi add + commit như trên...
git push -u origin feature/ten-tinh-nang

Vercel sẽ tạo một link xem thử riêng cho nhánh này. Khi thấy ổn, bạn gộp vào main bằng Pull Request trên GitHub (nút Compare & pull request), và bản chính thức sẽ tự cập nhật. Sau đó về máy cập nhật lại:
git checkout main
git pull

git pull                        # lấy code mới nhất từ GitHub (làm trước khi bắt đầu sửa)
git log --oneline               # xem lịch sử các lần commit
git diff                        # xem chi tiết dòng nào vừa sửa (trước khi add)
git restore ten-file.jsx        # bỏ thay đổi chưa commit của một file
git revert <mã-commit>          # tạo commit mới để hoàn tác một commit cũ đã push