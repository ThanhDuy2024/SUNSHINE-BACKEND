# <p align="center">☀️ SUNSHINE BACKEND</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-4.x-lightgrey?style=for-the-badge&logo=express" alt="Express">
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/pnpm-8.x-orange?style=for-the-badge&logo=pnpm" alt="pnpm">
</p>

<p align="center">
  <b>Hệ thống Backend thương mại điện tử tích hợp Trí tuệ nhân tạo (AI) 🤖</b>
  <br />
  <i>Giải pháp mạnh mẽ, bảo mật và thông minh cho nền tảng Sunshine Shop.</i>
</p>

---

## 🌟 Tính năng nổi bật

* **AI Smart Recommend:** Tích hợp **Google Gemini 1.5 Flash** để tư vấn sản phẩm thông minh.
* **Multi-Database:** Sử dụng song song **MySQL (Sequelize)** và **MongoDB (Mongoose)**.
* **High Security:** Bảo mật hệ thống với **JWT**, **BcryptJS** và **Rate Limit**.
* **Media Cloud:** Quản lý hình ảnh tập trung qua **Cloudinary**.
* **Standard Architecture:** Cấu trúc thư mục phân lớp (Layered Architecture) dễ bảo trì.

## 🛠️ Stack công nghệ

| Thành phần | Công nghệ |
| :--- | :--- |
| **Runtime** | Node.js (v18+) |
| **Framework** | Express.js |
| **Language** | TypeScript |
| **Database** | MySQL & MongoDB |
| **Libraries** | Cloudinary, JWT, Moment, BcryptJS, Express-rate-limit |
| **AI Integration** | @google/generative-ai (Gemini API) |
| **Package Manager** | pnpm |

## 📂 Cấu trúc thư mục `src`

```bash
src/
├── ⚙️ configs/      # Cấu hình Database, Cloudinary, Gemini API, Rate Limiter
├── 🎮 controllers/  # Tiếp nhận và xử lý HTTP Request/Response
├── 🛠️ helpers/      # Các hàm bổ trợ (Common logic)
├── 👔 interfaces/   # Định nghĩa Type/Interface cho TypeScript
├── 🛡️ middlewares/  # Auth Guard
├── 💾 models/       # Định nghĩa Schema (Mongoose & Sequelize)
├── 🛣️ routes/       # Khai báo các API Endpoints
├── ⚙️ services/     # Xử lý Business Logic chính của hệ thống
└── 🚀 index.ts      # File khởi tạo và chạy Server