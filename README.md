# 🛒 มือสองShop (Muesong Shop) - Secondhand E-commerce Platform

เว็บแอปพลิเคชันระบบร้านค้าซื้อขายสินค้ามือสองแบบครบวงจร (Full-stack E-commerce) ดีไซน์ตาม Figma Pixel-perfect พร้อมระบบยืนยันตัวตนแบบ Single Login และเชื่อมต่อ MongoDB Atlas Database `shop`

---

## ✨ ไฮไลท์ฟีเจอร์เด่น (Key Features)

1. **🔐 Single-Form Smart Login (RBAC):**
   - ฟอร์มเข้าสู่ระบบฟอร์มเดียว เช็คสิทธิ์และบทบาท (Admin / User) อัตโนมัติจากฐานข้อมูล
   - เข้ารหัสรหัสผ่านด้วย `bcryptjs`
   - ระบบยืนยันตัวตนด้วย JSON Web Token (JWT)
2. **🛍️ Secondhand Inventory & Stock Locking:**
   - จัดการสินค้ามือสองแบบ 1 ชิ้นต่อ 1 รายการ (Unique unit)
   - เมื่อมีการสั่งซื้อและชำระเงิน ระบบจะเปลี่ยนสถานะเป็น `sold` (ขายแล้ว) และล็อคไม่ให้ผู้อื่นสั่งซื้อซ้ำ
3. **💳 PromptPay QR & Slip Verification:**
   - แสดง QR Code พร้อมเพย์ตามยอดเงินจริง
   - รองรับการอัปโหลดไฟล์ **สลิปการโอนเงิน (Payment Slip)**
   - หน้า Admin สามารถตรวจสอบสลิปของลูกค้าและกดอนุมัติการจัดส่งได้ทันที
4. **🎨 Figma Fidelity UI/UX:**
   - ธีมสีเขียวมือสองShop (`#22C55E` / `#15803d`)
   - ฟอนต์ภาษาไทย **Google Prompt** สวยงาม อ่านง่าย
   - Pixel Art Avatar สำหรับหน้าจัดการผู้ใช้งาน
   - ปุ่มลอยตัวสีแดง `(-)` ลบสินค้าสำหรับ Admin บนการ์ดสินค้า
   - ตะกร้าสินค้าสไตล์ Ticket ใบเสร็จ พร้อมยอดรวมสุทธิเด่นชัด
5. **⚡ Architecture & Code Quality:**
   - Toast Notification แจ้งเตือนแบบ Non-blocking
   - React Error Boundary ป้องกันหน้าขาว
   - เชื่อมต่อ MongoDB Atlas Cluster

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- **Frontend:** React 19, Vite 8, Tailwind CSS v4, Lucide React
- **Backend API:** Node.js, Express.js, Mongoose, JWT, BcryptJS
- **Database:** MongoDB Atlas (Database: `shop`)

---

## 🚀 วิธีการติดตั้งและรันโปรเจกต์ (Getting Started)

### 1. โคลนโปรเจกต์และติดตั้ง Dependencies
```bash
git clone https://github.com/me1121118/muesong-shop.git
cd muesong-shop
npm install
```

### 2. ตั้งค่าไฟล์ Environment (.env)
สร้างไฟล์ `.env` ในโฟลเดอร์หลัก:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.aunlflw.mongodb.net/shop?appName=Cluster0
JWT_SECRET=muesong-shop-jwt-super-secret-key-2026
```

### 3. รันเซิร์ฟเวอร์
**รัน Backend API (Port 5000):**
```bash
node server.js
```

**รัน Frontend (Port 5173):**
```bash
npm run dev
```

---

## 🔑 บัญชีทดสอบระบบ (Test Accounts)

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@muesong.com` | `1234` | จัดการสินค้า, ตรวจสลิป, ลบ/อนุมัติคำสั่งซื้อ |
| **Customer** | `somchai@email.com` | `1234` | สั่งซื้อสินค้า, อัปโหลดสลิป, ตะกร้าสินค้า |
