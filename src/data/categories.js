export const CATEGORIES_DATA = [
  {
    id: 'phone-tablet',
    name: 'โทรศัพท์ & แท็บเล็ต',
    icon: 'Smartphone',
    subcategories: [
      {
        title: 'โทรศัพท์',
        items: ['iPhone', 'OPPO', 'vivo', 'iQOO', 'Xiaomi', 'POCO', 'Redmi', 'Samsung', 'OnePlus', 'Huawei', 'Realme']
      },
      {
        title: 'แท็บเล็ต',
        items: ['iPad', 'Galaxy Tab', 'Xiaomi Pad', 'MatePad', 'Lenovo Tab', 'OPPO Pad']
      },
      {
        title: 'อุปกรณ์เสริม',
        items: ['เคส/ฟิล์ม', 'ฟิล์ม/กระจก', 'สายชาร์จ', 'อะแดปเตอร์', 'Power Bank', 'แท่นชาร์จ']
      }
    ]
  },
  {
    id: 'computer-laptop',
    name: 'คอมพิวเตอร์ & โน้ตบุ๊ก',
    icon: 'Laptop',
    subcategories: [
      {
        title: 'โน้ตบุ๊ก',
        items: ['Notebook', 'Gaming Notebook', 'MacBook']
      },
      {
        title: 'คอมพิวเตอร์',
        items: ['Desktop PC', 'Gaming PC', 'Mini PC', 'All-In-One PC']
      },
      {
        title: 'อุปกรณ์เสริม',
        items: ['Docking Station', 'Notebook Station', 'Cooling Pad', 'กระเป๋าโน้ตบุ๊ก', 'Adapter / Charger', 'Webcam']
      }
    ]
  },
  {
    id: 'gaming',
    name: 'เกม & Gaming',
    icon: 'Gamepad2',
    subcategories: [
      {
        title: 'เครื่องเกม',
        items: ['PlayStation 5', 'PlayStation 4/3/2', 'Xbox Series X/S', 'Xbox One', 'Nintendo Switch', 'Nintendo 3DS', 'Steam Deck']
      },
      {
        title: 'เกม',
        items: ['เกม PS5 / PS4', 'เกม Xbox', 'เกม Nintendo', 'เกม PC', 'แผ่นเกม', 'Digital Game / Account']
      },
      {
        title: 'อุปกรณ์เล่นเกม',
        items: ['Gaming Keyboard', 'Gaming Mouse', 'Gaming Headset', 'Gamepad / Controller', 'Gaming Monitor', 'อุปกรณ์ Streaming']
      }
    ]
  },
  {
    id: 'audio',
    name: 'เครื่องเสียง & หูฟัง',
    icon: 'Headphones',
    subcategories: [
      {
        title: 'หูฟัง',
        items: ['TWS / True Wireless', 'หูฟังครอบหู', 'หูฟัง In-Ear', 'Gaming Headset', 'หูฟังมีสาย', 'หูฟัง Bluetooth']
      },
      {
        title: 'เครื่องเสียง',
        items: ['ลำโพง Bluetooth', 'ลำโพงบ้าน', 'Soundbar', 'Amplifier', 'DAC / AMP', 'เครื่องเล่นเพลง', 'ชุดเครื่องเสียง']
      },
      {
        title: 'อุปกรณ์เสริม',
        items: ['สาย Audio', 'หัวแปลง / Adapter', 'Microphone', 'Audio Interface', 'ขาตั้งหูฟัง / ลำโพง', 'Ear Tips / ฟองน้ำหูฟัง']
      }
    ]
  },
  {
    id: 'camera',
    name: 'กล้อง, อุปกรณ์ถ่ายภาพ',
    icon: 'Camera',
    subcategories: [
      {
        title: 'กล้อง',
        items: ['กล้อง Mirrorless', 'กล้อง DSLR', 'กล้อง Compact', 'กล้อง Action Camera', 'กล้อง Instant', 'กล้องวิดีโอ / Camcorder']
      },
      {
        title: 'เลนส์, อุปกรณ์',
        items: ['เลนส์กล้อง', 'Flash / Speedlight', 'แบตเตอรี่ / Charger', 'Filter / ฟิลเตอร์', 'Memory Card', 'Adapter / Mount', 'Grip / Battery Grip']
      },
      {
        title: 'อุปกรณ์เสริม',
        items: ['ขาตั้งกล้อง', 'กระเป๋ากล้อง', 'Gimbal / Stabilizer', 'ไมโครโฟน', 'ไฟถ่ายภาพ', 'ฉาก / อุปกรณ์ Studio', 'อุปกรณ์ทำความสะอาด']
      }
    ]
  },
  {
    id: 'electronics',
    name: 'ภาพและความบันเทิง / เครื่องใช้ไฟฟ้า',
    icon: 'Tv',
    subcategories: [
      {
        title: 'ภาพและความบันเทิง',
        items: ['Smart TV', 'LED / OLED TV', 'Projector', 'เครื่องเล่น blu-ray / DVD', 'TV Box / Streaming', 'รีโมต / อุปกรณ์ TV']
      },
      {
        title: 'เครื่องใช้ไฟฟ้าในบ้าน',
        items: ['ตู้เย็น', 'เครื่องซักผ้า', 'เครื่องปรับอากาศ', 'พัดลม', 'เครื่องฟอกอากาศ', 'เครื่องดูดฝุ่น']
      },
      {
        title: 'เครื่องใช้ไฟฟ้าขนาดเล็ก',
        items: ['ไมโครเวฟ', 'หม้อทอด', 'หม้อหุงข้าว', 'เครื่องชงกาแฟ', 'กาน้ำร้อน', 'เตารีด']
      }
    ]
  },
  {
    id: 'smartwatch',
    name: 'Smart Watch & Wearable',
    icon: 'Watch',
    subcategories: [
      {
        title: 'Smart Watch',
        items: ['Apple Watch', 'Samsung Galaxy Watch', 'HUAWEI Watch', 'Xiaomi Watch', 'Amazfit', 'Garmin', 'OPPO Watch', 'vivo Watch', 'HONOR Watch']
      },
      {
        title: 'Fitness & Wearable',
        items: ['Fitness Band', 'Smart Band', 'Smart Ring', 'อุปกรณ์วัดสุขภาพ', 'อุปกรณ์ติดตามและตรวจจับการนอน']
      },
      {
        title: 'อุปกรณ์เสริม',
        items: ['สายนาฬิกา', 'ฟิล์ม / กระจก', 'สายชาร์จ', 'Charger', 'เคส / Cover', 'อะไหล่ / อุปกรณ์กระชับ']
      }
    ]
  }
];
