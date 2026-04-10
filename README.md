# 📟 DexHub - Pokémon Information Ecosystem

DexHub không chỉ là một Pokédex thông thường — đây là một nền tảng toàn diện dành cho các Trainer muốn tra cứu, phân tích và xây dựng chiến thuật chuyên sâu trong thế giới Pokémon.

---

## 🌐 Live Demo

👉 https://dexhub-v1.vercel.app/

---

## ✨ Features

### 🛡️ Pokémon Database

- Tra cứu hơn **1000+ Pokémon**
- Thông tin chi tiết:
  - Base Stats
  - Evolution Chain
  - Forms (Mega, Regional, etc.)

### ⚔️ Move Library

- Danh sách đầy đủ chiêu thức
- Phân loại:
  - Type (Fire, Water,...)
  - Category (Physical / Special / Status)
  - Accuracy / Power / PP

### 🧪 Items & Abilities

- Tra cứu vật phẩm hỗ trợ (Held Items)
- Hiệu ứng đặc tính (Abilities)

### ⚖️ Nature Calculator

- Hiển thị Nature:
  - Chỉ số tăng (+)
  - Chỉ số giảm (-)

### ✍️ Trainer Blog

- Bài viết chiến thuật:
  - Team building
  - Meta analysis
  - Hướng dẫn chơi

- Dữ liệu quản lý qua CMS

---

## 🧠 Architecture Overview

```txt
User → Next.js App → React Query → API Layer → Data Sources
                                      ├── PokeAPI
                                      └── Pokemon Showdown
Blog Content → Contentful CMS
```

- **Next.js (App Router)**: Routing & SSR
- **React Query**: Cache & quản lý server state
- **Axios**: Gọi API
- **Contentful**: CMS cho Blog
- **Tailwind CSS**: Styling

---

## 🛠 Tech Stack

| Category         | Technology                |
| ---------------- | ------------------------- |
| Frontend         | Next.js                   |
| Styling          | Tailwind CSS              |
| Data Fetching    | Axios                     |
| State Management | React Query               |
| CMS              | Contentful                |
| Data Source      | PokeAPI, Pokemon Showdown |

---

## 📂 Project Structure

```
dexhub/
├── app/
│   ├── home
│   ├── abilities
│   ├── blog
│   ├── items
│   ├── moves
│   ├── natures
│   └── pokemon
├── components/
├── constants/
├── hooks/
├── libs/
├── public/
├── services/
├── store/
├── types/
└── utils/
```

---

## 🚀 Getting Started

### 1. Clone project

```bash
git clone https://github.com/tiennv01032004/dexhub.git
cd dexhub
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Tạo file `.env.local`:

```env
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_access_token
```

### 4. Run development server

```bash
npm run dev
```

App sẽ chạy tại:
👉 http://localhost:3000

---

## 📖 Usage

- `/pokemon` → Tra cứu Pokémon
- `/moves` → Danh sách chiêu thức
- `/items` → Vật phẩm
- `/abilities` → Đặc tính
- `/natures` → Nature
- `/blog` → Bài viết chiến thuật

---

## 🚀 Deployment

Deploy nhanh với Vercel:

```bash
npm run build
npm start
```

Hoặc:

- Push code lên GitHub
- Import vào Vercel
- Thêm environment variables

---

## 🧪 Testing

Hiện tại project chưa tích hợp testing framework.
_(Có thể bổ sung Jest / React Testing Library trong tương lai)_

---

## 🔮 Future Improvements

- 🔍 Advanced search & filter
- 📊 Damage calculator
- 🧬 Team builder tool
- 🌙 Dark mode
- 🌍 Multi-language support

---

## 📜 License

Distributed under the MIT License.

---

## 👤 Author

**Tien Nguyen**

- Name: Nguyen Van Tien
- GitHub: https://github.com/tiennv01032004
- Email: tiennv01032004@gmail.com

---
