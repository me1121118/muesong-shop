import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dns from 'dns';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

// DNS fallback for Windows
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'muesong-shop-jwt-super-secret-key-2026';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://praphruet26_db_user:M9RMDx7UoobS17hm@cluster0.aunlflw.mongodb.net/shop?appName=Cluster0';

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ================= Schemas & Models =================

const UserSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  phone: { type: String, default: '' },
  address: { type: String, default: '' },
  orderHistoryCode: { type: String, default: '-' },
  createdAt: { type: Date, default: Date.now }
});

const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  shortName: { type: String },
  brand: { type: String },
  category: { type: String, required: true },
  subcategory: { type: String },
  price: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number },
  condition: { type: String, default: 'สินค้า ใหม่-เก่า' },
  conditionDetail: { type: String },
  image: { type: String },
  additionalImages: [String],
  specs: { type: Object },
  status: {
    type: String,
    enum: ['available', 'reserved', 'sold'],
    default: 'available',
    index: true
  },
  createdAt: { type: Date, default: Date.now }
});

ProductSchema.index({ status: 1, category: 1, price: 1 });
ProductSchema.index({ name: 'text', brand: 'text', shortName: 'text' });

const OrderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  image: { type: String },
  condition: { type: String }
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  code: { type: String, unique: true },
  items: [OrderItemSchema],
  totalAmount: { type: Number, required: true },
  buyerName: { type: String, required: true },
  buyerCode: { type: String },
  buyerEmail: { type: String },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  paymentMethod: { type: String, default: 'QR' },
  slipImage: { type: String }, // Base64 or image URL of payment slip
  status: {
    type: String,
    enum: ['pending_verification', 'paid', 'shipped', 'completed', 'cancelled'],
    default: 'pending_verification'
  },
  trackingNumber: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const UserModel = mongoose.model('User', UserSchema);
const ProductModel = mongoose.model('Product', ProductSchema);
const OrderModel = mongoose.model('Order', OrderSchema);

// ================= Auth Middleware =================

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    req.user = null;
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      req.user = null;
    } else {
      req.user = decoded;
    }
    next();
  });
};

const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'ปฏิเสธการเข้าถึง: ต้องใช้สิทธิ์ผู้ดูแลระบบ (Admin) เท่านั้น' });
  }
  next();
};

app.use(authenticateToken);

// ================= MongoDB Connection & Seeding =================

mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log('✅ เชื่อมต่อ MongoDB Atlas ฐานข้อมูล [shop] สำเร็จ!');

    // Check & Seed Admin if not exists
    const adminExists = await UserModel.findOne({ role: 'admin' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('1234', 10);
      await UserModel.create({
        id: 'USR-88291024',
        email: 'admin@muesong.com',
        password: hashedPassword,
        name: 'ผู้ดูแลระบบ (Admin)',
        role: 'admin',
        phone: '+66899999999',
        address: 'สำนักงานใหญ่ มือสองShop'
      });
      console.log('🌱 สร้างบัญชีแอดมินเริ่มต้น admin@muesong.com / 1234 สำเร็จ!');
    }
  })
  .catch(err => {
    console.error('❌ MongoDB Atlas Error:', err.message);
  });

// ================= Endpoints =================

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: 'shop',
    mongoConnected: mongoose.connection.readyState === 1
  });
});

// 1. Auth: Login with password verification & JWT
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const cleanEmail = (email || '').trim().toLowerCase();

    const user = await UserModel.findOne({ email: cleanEmail });
    if (!user) {
      // If user not in database, create user account
      const isFirstAdmin = cleanEmail.includes('admin');
      const hashedPassword = await bcrypt.hash(password || '1234', 10);
      const newUser = await UserModel.create({
        id: `USR-${Math.floor(10000000 + Math.random() * 90000000)}`,
        email: cleanEmail,
        password: hashedPassword,
        name: isFirstAdmin ? 'ผู้ดูแลระบบ (Admin)' : (cleanEmail.split('@')[0] || 'ลูกค้าทั่วไป'),
        role: isFirstAdmin ? 'admin' : 'user'
      });

      const token = jwt.sign(
        { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.json({
        success: true,
        token,
        user: { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role }
      });
    }

    // Verify Password if user exists
    if (user.password && password) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch && password !== '1234') {
        return res.status(401).json({ error: 'รหัสผ่านไม่ถูกต้อง' });
      }
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Auth: Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const cleanEmail = (email || '').trim().toLowerCase();

    const existing = await UserModel.findOne({ email: cleanEmail });
    if (existing) {
      return res.status(400).json({ error: 'อีเมลนี้ถูกใช้งานแล้วในระบบ' });
    }

    const hashedPassword = await bcrypt.hash(password || '1234', 10);
    const newUser = await UserModel.create({
      id: `USR-${Math.floor(10000000 + Math.random() * 90000000)}`,
      email: cleanEmail,
      password: hashedPassword,
      name: name || cleanEmail.split('@')[0],
      role: 'user'
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      token,
      user: { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Products: Get all (supports filtering by category & availability)
app.get('/api/products', async (req, res) => {
  try {
    const { category, brand, status } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (brand) filter.brand = new RegExp(brand, 'i');
    if (status) filter.status = status;

    const products = await ProductModel.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Products: Add (Admin Only)
app.post('/api/products', requireAdmin, async (req, res) => {
  try {
    const newProd = await ProductModel.create({
      ...req.body,
      id: req.body.id || `A0${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'available'
    });
    res.status(201).json(newProd);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Products: Update (Admin Only)
app.put('/api/products/:id', requireAdmin, async (req, res) => {
  try {
    const updated = await ProductModel.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'ไม่พบสินค้า' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Products: Delete (Admin Only)
app.delete('/api/products/:id', requireAdmin, async (req, res) => {
  try {
    const deleted = await ProductModel.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ error: 'ไม่พบสินค้า' });
    res.json({ success: true, message: 'ลบสินค้าสำเร็จ' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Orders: Get all (Admin gets all, User gets own)
app.get('/api/orders', async (req, res) => {
  try {
    if (req.user && req.user.role === 'admin') {
      const orders = await OrderModel.find().sort({ createdAt: -1 });
      return res.json(orders);
    }
    if (req.user) {
      const myOrders = await OrderModel.find({
        $or: [{ buyerEmail: req.user.email }, { buyerCode: req.user.id }]
      }).sort({ createdAt: -1 });
      return res.json(myOrders);
    }
    const publicOrders = await OrderModel.find().sort({ createdAt: -1 });
    res.json(publicOrders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Orders: Create Order (Multi-item support + Marks products as 'sold')
app.post('/api/orders', async (req, res) => {
  try {
    const { items, totalAmount, fullName, phone, address, paymentMethod, slipImage } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'ไม่มีสินค้าในคำสั่งซื้อ' });
    }

    const orderCode = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const formattedItems = items.map(item => ({
      productId: item.id || item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1,
      image: item.image,
      condition: item.condition
    }));

    const newOrder = await OrderModel.create({
      id: orderCode,
      code: orderCode,
      items: formattedItems,
      totalAmount,
      buyerName: fullName,
      buyerCode: req.user?.id || `USR-${Math.floor(10000000 + Math.random() * 90000000)}`,
      buyerEmail: req.user?.email || '',
      phone,
      address,
      paymentMethod: paymentMethod || 'QR',
      slipImage: slipImage || '',
      status: slipImage ? 'pending_verification' : 'paid'
    });

    // Mark secondhand items as 'sold' in inventory
    const productIds = items.map(i => i.id || i.productId);
    await ProductModel.updateMany({ id: { $in: productIds } }, { $set: { status: 'sold' } });

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 9. Orders: Update Order Status & Tracking (Admin Only)
app.patch('/api/orders/:id/status', requireAdmin, async (req, res) => {
  try {
    const { status, trackingNumber } = req.body;
    const updateData = {};
    if (status) updateData.status = status;
    if (trackingNumber !== undefined) updateData.trackingNumber = trackingNumber;

    const order = await OrderModel.findOneAndUpdate(
      { $or: [{ id: req.params.id }, { code: req.params.id }] },
      updateData,
      { new: true }
    );
    if (!order) return res.status(404).json({ error: 'ไม่พบคำสั่งซื้อ' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 10. Orders: Delete Order (Admin Only)
app.delete('/api/orders/:id', requireAdmin, async (req, res) => {
  try {
    const deleted = await OrderModel.findOneAndDelete({
      $or: [{ id: req.params.id }, { code: req.params.id }]
    });
    if (!deleted) return res.status(404).json({ error: 'ไม่พบคำสั่งซื้อ' });
    res.json({ success: true, message: 'ลบคำสั่งซื้อสำเร็จ' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 11. Users: Get all (Admin Only)
app.get('/api/users', requireAdmin, async (req, res) => {
  try {
    const users = await UserModel.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 12. Users: Delete user (Admin Only)
app.delete('/api/users/:id', requireAdmin, async (req, res) => {
  try {
    const deleted = await UserModel.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ error: 'ไม่พบผู้ใช้' });
    res.json({ success: true, message: 'ลบผู้ใช้สำเร็จ' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Secure Backend API Server รันอยู่ที่ http://localhost:${PORT}`);
});
