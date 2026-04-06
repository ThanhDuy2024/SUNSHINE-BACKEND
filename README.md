☀️ SUNSHINE BACKEND

Hệ thống Backend cho nền tảng thương mại điện tử Sunshine, được xây dựng trên nền tảng Node.js mạnh mẽ, hỗ trợ tích hợp trí tuệ nhân tạo Gemini để gợi ý sản phẩm thông minh.
🚀 Công nghệ sử dụng

    Runtime: Node.js (v18+)

    Framework: Express.js

    Language: TypeScript

    Libary: Cloudinary, JsonWebToken, Moment, BcryptJS, Express-rate-limit

    Database: MySQL (Sequelize), MongoDB (Mongoose)

    AI Integration: Google Gemini API (@google/generative-ai)

    Package Manager: pnpm

📂 Cấu trúc thư mục (src)
Plaintext

src/
├── configs/          # Cấu hình Database
├── constants/        # Định nghĩa các biến hằng số, enum
├── controllers/      # Xử lý Logic HTTP Request & Response
├── helpers/          # Các hàm tiện ích dùng chung
├── interfaces/       # Định nghĩa kiểu dữ liệu (TypeScript Interfaces)
├── middlewares/      # Kiểm tra Auth, phân quyền, xử lý lỗi
├── models/           # Định nghĩa Schema Database (Mongoose)
├── routes/           # Khai báo các API Endpoints
├── services/         # Xử lý nghiệp vụ chính (Business Logic)
├── utils/            # Các công cụ hỗ trợ khác
└── index.ts          # Điểm khởi đầu của ứng dụng

🛠️ Cài đặt và Chạy thử
1. Clone dự án
Bash

git clone https://github.com/ThanhDuy2024/SUNSHINE-BACKEND.git
cd SUNSHINE-BACKEND

2. Cài đặt thư viện
Bash

pnpm install

3. Chạy ứng dụng

    Chế độ phát triển (Development):
    Bash

    pnpm dev

    Build dự án:
    Bash

    pnpm build

    Chạy bản Build:
    Bash

    pnpm start