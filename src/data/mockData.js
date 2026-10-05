export const INITIAL_PRODUCTS = [
  {
    id: 'A0184613',
    name: 'HUAWEI Pura 90s Pro Max (12+512GB) Orange Ocean',
    shortName: 'Huawei Pura 90s Pro Max',
    brand: 'Huawei',
    category: 'โทรศัพท์ & แท็บเล็ต',
    subcategory: 'โทรศัพท์',
    price: 30990,
    originalPrice: 38900,
    condition: 'สินค้า ใหม่-เก่า',
    conditionDetail: 'สภาพ 98% ใช้งานปกติ ไร้รอยตกหล่น ครบกล่อง',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80'
    ],
    specs: {
      cpu: 'Kirin 9030S',
      ram: '12GB',
      rom: '512GB',
      display: '6.9" LTPO OLED 120Hz',
      frontCamera: '13.0MP',
      backCamera: '50.0MP + 40.0MP + 200.0MP',
      os: 'EMUI 16',
      battery: '6000mAh',
      warranty: '1 Y',
      delivery: 'จัดส่งด่วน 3 - 5 วัน ฟรี'
    }
  },
  {
    id: 'A0184614',
    name: 'iPhone 15 Pro Max 256GB Natural Titanium',
    shortName: 'iPhone 15 Pro Max',
    brand: 'iPhone',
    category: 'โทรศัพท์ & แท็บเล็ต',
    subcategory: 'โทรศัพท์',
    price: 34500,
    originalPrice: 48900,
    condition: 'สินค้า ใหม่-เก่า',
    conditionDetail: 'สุขภาพแบต 95% อุปกรณ์ครบกล่อง',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
    specs: {
      cpu: 'A17 Pro',
      ram: '8GB',
      rom: '256GB',
      display: '6.7" Super Retina XDR OLED',
      frontCamera: '12.0MP',
      backCamera: '48.0MP + 12.0MP + 12.0MP',
      os: 'iOS 18',
      battery: '4422mAh',
      warranty: '6 M',
      delivery: 'จัดส่งด่วน 3 - 5 วัน ฟรี'
    }
  },
  {
    id: 'A0184615',
    name: 'Sony PlayStation 5 Slim Digital Edition',
    shortName: 'PlayStation 5 Slim',
    brand: 'PlayStation 5',
    category: 'เกม & Gaming',
    subcategory: 'เครื่องเกม',
    price: 13900,
    originalPrice: 16900,
    condition: 'สินค้า เก่า-ใหม่',
    conditionDetail: 'สภาพนางฟ้า มี 1 จอย พร้อมสายแท้',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&auto=format&fit=crop&q=80',
    specs: {
      cpu: 'AMD Zen 2 8-core',
      ram: '16GB GDDR6',
      rom: '1TB SSD',
      display: 'รองรับ 4K 120Hz / 8K',
      warranty: '3 M',
      delivery: 'จัดส่งด่วน 2 - 3 วัน ฟรี'
    }
  },
  {
    id: 'A0184616',
    name: 'Sony Alpha 7 IV (Body Only) สภาพงาม',
    shortName: 'Sony A7 IV',
    brand: 'Sony',
    category: 'กล้อง, อุปกรณ์ถ่ายภาพ',
    subcategory: 'กล้อง',
    price: 58900,
    originalPrice: 82990,
    condition: 'สินค้า ใหม่-เก่า',
    conditionDetail: 'ชัตเตอร์ 4,xxx ครั้ง แบตแท้ 2 ก้อน',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80',
    specs: {
      sensor: '33MP Full-Frame Exmor R CMOS',
      video: '4K 60p 10-bit 4:2:2',
      display: 'จอพับสัมผัส Vari-angle',
      warranty: '6 M',
      delivery: 'จัดส่งด่วนพร้อมรับประกันสินค้า'
    }
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'ORD-2026-9901',
    code: 'ORD-2026-9901',
    productId: 'A0184613',
    productName: 'Huawei Pura 90s Pro Max',
    productCode: 'A0184613',
    price: 30990,
    productImage: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
    buyerName: 'สมชาย มั่นใจดี',
    buyerCode: 'USR-88291024',
    phone: '+66812345678',
    address: '123/45 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110',
    status: 'รอจัดส่ง',
    hasReceiptQR: true,
    specsSummary: 'CPU: Kirin 9030S | Ram: 12GB | Rom: 512GB | Battery: 6000mAh'
  }
];

export const INITIAL_USERS = [
  {
    id: 'USR-88291024',
    name: 'สมชาย มั่นใจดี',
    username: 'somchai_m',
    phone: '+66812345678',
    address: '123/45 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110',
    orderHistoryCode: 'ORD-2026-9901'
  },
  {
    id: 'USR-88291025',
    name: 'กมลชนก รักดี',
    username: 'kamon_rd',
    phone: '+66898765432',
    address: '88/9 หมู่ 4 ต.สุเทพ อ.เมือง จ.เชียงใหม่ 50200',
    orderHistoryCode: '-'
  }
];

export const REGISTERED_ACCOUNTS = [
  {
    email: 'admin@muesong.com',
    username: 'admin',
    name: 'ผู้ดูแลระบบ (Admin)',
    role: 'admin'
  },
  {
    email: 'somchai@email.com',
    username: 'somchai',
    name: 'สมชาย มั่นใจดี',
    role: 'user'
  }
];
