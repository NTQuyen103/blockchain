// Khung Backend – Express. Sẽ gắn routes/controllers/models khi triển khai.
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({ origin: 'http://localhost:5173' })); // địa chỉ Vite dev server
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true }));
// TODO: app.use('/api/auth', authRoutes);   // routes/auth.js -> controllers/authController.js
// TODO: app.use('/api/boxes', boxRoutes);

app.listen(process.env.PORT || 4000, () => console.log('API chạy tại cổng 4000'));
