import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import MysteryBox from './pages/MysteryBox.jsx';
import Inventory from './pages/Inventory.jsx';
import Admin from './pages/Admin.jsx';

/** Định tuyến chính. Thêm trang mới: tạo file trong /pages rồi khai báo Route ở đây. */
export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mystery-box" element={<MysteryBox />} />
          <Route path="/mystery-box/:boxId" element={<MysteryBox />} />
          <Route path="/collection" element={<Inventory />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<p className="p-20 text-center">Không tìm thấy trang.</p>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
