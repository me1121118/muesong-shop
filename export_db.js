import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import dns from 'dns';

dotenv.config();

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://praphruet26_db_user:M9RMDx7UoobS17hm@cluster0.aunlflw.mongodb.net/shop?appName=Cluster0';

async function exportData() {
  console.log('⏳ กำลังเชื่อมต่อ MongoDB Atlas...');
  await mongoose.connect(MONGODB_URI);
  console.log('✅ เชื่อมต่อสำเร็จ! กำลังดึงข้อมูลจากฐานข้อมูล [shop]...');

  const db = mongoose.connection.db;
  const collections = await db.listCollections().toArray();

  const exportDir = path.join(process.cwd(), 'database_export');
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
  }

  const summary = {};

  for (const col of collections) {
    const colName = col.name;
    const data = await db.collection(colName).find({}).toArray();
    summary[colName] = data.length;

    const filePath = path.join(exportDir, `${colName}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`📦 ส่งออก Collection [${colName}]: ${data.length} รายการ -> ${filePath}`);
  }

  // Also create a combined backup file
  const fullBackup = {
    exportedAt: new Date().toISOString(),
    database: 'shop',
    summary,
    data: {}
  };

  for (const col of collections) {
    fullBackup.data[col.name] = await db.collection(col.name).find({}).toArray();
  }

  fs.writeFileSync(
    path.join(exportDir, 'shop_full_backup.json'),
    JSON.stringify(fullBackup, null, 2),
    'utf-8'
  );

  console.log('\n🎉 ส่งออกข้อมูลทั้งหมดเสร็จสมบูรณ์!');
  console.log(`📁 ไฟล์ทั้งหมดถูกเก็บไว้ที่: ${exportDir}`);
  process.exit(0);
}

exportData().catch(err => {
  console.error('❌ เกิดข้อผิดพลาดในการดึงข้อมูล:', err.message);
  process.exit(1);
});
