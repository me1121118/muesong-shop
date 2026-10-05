import mongoose from 'mongoose';
import dns from 'dns';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_USERS } from './src/data/mockData.js';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

const uri = 'mongodb+srv://praphruet26_db_user:M9RMDx7UoobS17hm@cluster0.aunlflw.mongodb.net/shop?appName=Cluster0';

async function seed() {
  console.log('🔄 กำลังเชื่อมต่อ MongoDB Atlas...');
  await mongoose.connect(uri);
  console.log('✅ เชื่อมต่อ MongoDB Atlas สำเร็จ!');

  // 1. Drop old 'menu' database
  try {
    const menuDb = mongoose.connection.client.db('menu');
    await menuDb.dropDatabase();
    console.log('🗑️ ลบฐานข้อมูลเก่า [menu] สำเร็จเรียบร้อย');
  } catch (err) {
    console.log('Note menu drop:', err.message);
  }

  // 2. Setup 'shop' database
  const shopDb = mongoose.connection.client.db('shop');

  // Reset collections in 'shop'
  try { await shopDb.collection('products').drop(); } catch (e) {}
  try { await shopDb.collection('orders').drop(); } catch (e) {}
  try { await shopDb.collection('users').drop(); } catch (e) {}

  console.log('📦 กำลังสร้างตารางและลงข้อมูลเริ่มต้นสำหรับ [shop]...');

  // Insert Products
  const prodResult = await shopDb.collection('products').insertMany(INITIAL_PRODUCTS);
  console.log(`✅ บันทึกสินค้าสำเร็จ: ${prodResult.insertedCount} รายการ (รวม Huawei Pura 90s, iPhone, PS5, Sony A7)`);

  // Insert Users
  const userResult = await shopDb.collection('users').insertMany([
    {
      id: 'USR-88291024',
      email: 'admin@muesong.com',
      name: 'ผู้ดูแลระบบ (Admin)',
      role: 'admin',
      phone: '+66899999999',
      address: 'สำนักงานใหญ่ มือสองShop',
      orderHistoryCode: '-'
    },
    ...INITIAL_USERS.map(u => ({ ...u, role: 'user', email: `${u.username || 'user'}@email.com` }))
  ]);
  console.log(`✅ บันทึกผู้ใช้งานสำเร็จ: ${userResult.insertedCount} บัญชี (รวมแอดมินและลูกค้า)`);

  // Insert Orders
  const orderResult = await shopDb.collection('orders').insertMany(INITIAL_ORDERS);
  console.log(`✅ บันทึกคำสั่งซื้อสำเร็จ: ${orderResult.insertedCount} รายการ`);

  console.log('🎉 สร้างฐานข้อมูล [shop] บน MongoDB Atlas เสร็จสมบูรณ์ 100%!');
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Error during setup:', err);
  process.exit(1);
});
