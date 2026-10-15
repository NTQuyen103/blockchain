export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line/10 bg-crypt">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <h3 className="font-bold text-ink">MystiBox NFT</h3>
          <p className="mt-2 max-w-sm text-sm text-mute">Khám phá, thu thập và giao dịch các tài sản NFT độc bản trong thế giới game kỳ ảo.</p>
        </div>
        <div className="text-sm text-mute">
          <h4 className="mb-2 font-semibold text-ink">Hỗ trợ</h4>
          <p>Câu hỏi thường gặp</p><p>Hướng dẫn</p><p>Liên hệ</p>
        </div>
        <div className="text-sm text-mute">
          <h4 className="mb-2 font-semibold text-ink">Pháp lý</h4>
          <p>Điều khoản</p><p>Chính sách bảo mật</p>
        </div>
      </div>
      <p className="border-t border-line/10 py-4 text-center text-xs text-faint">© 2024 MystiBox NFT. Tất cả các quyền được bảo lưu.</p>
    </footer>
  );
}
