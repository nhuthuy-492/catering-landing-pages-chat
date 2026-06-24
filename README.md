# Catering Landing Pages & MCP Skills Server

Repository này chứa toàn bộ lịch sử cuộc trò chuyện (Transcripts), mã nguồn các trang Landing Page dịch vụ ăn uống (Catering) tại Sydney, và một máy chủ **Model Context Protocol (MCP)** hoạt động hoàn chỉnh để cung cấp các kỹ năng (Skills) viết code cho các mô hình AI.

This repository contains the complete conversation history (transcripts), source code for landing pages for catering services in Sydney, and a fully functional **Model Context Protocol (MCP)** server to serve coding skills to AI models.

---

## 📂 Cấu trúc Repository (Repository Structure)

```text
├── docs/                      # Tài liệu chi tiết về MCP Server & Spec
├── src/                       # Mã nguồn TypeScript của MCP Server
├── skills/
│   └── caterking-helper/      # Kỹ năng MCP tùy chỉnh (caterking-helper skill)
│       ├── SKILL.md           # Hướng dẫn chi tiết tạo Landing Page tối ưu SEO
│       ├── assets/            # Các file template gốc (Waverley)
│       └── scripts/           # Script tự động hóa sinh mã nguồn cho các Suburb
├── spit-roast-catering-[suburb]/ # Thư mục chứa Landing Pages & CSS của 10 khu vực
│   ├── Annandale, Bondi Junction, Campsie, Camperdown, Canterbury,
│   └── Coogee, Kensington, Northern Beaches, Parramatta, Waverley
├── conversation_transcript.md   # Lịch sử chat định dạng Markdown
├── conversation_transcript.html # Giao diện bong bóng chat đẹp mắt để đọc trực tiếp
├── conversation_transcript.json # Dữ liệu chat có cấu trúc (Structured JSON)
├── code_transfer.html         # Công cụ hỗ trợ copy-paste nhanh toàn bộ code Landing Pages
├── package.json               # Cấu hình dự án & Dependencies
├── tsconfig.json              # Cấu hình TypeScript compiler
└── README.md                  # Hướng dẫn này
```

---

## 💬 Xem Lịch sử cuộc trò chuyện (View Chat History)

Bạn có thể đọc toàn bộ tiến trình trao đổi, tối ưu hóa SEO và xử lý chuyển đổi ảnh `.webp` thông qua 3 định dạng:
1. **[Giao diện Chat trực quan (HTML)](./conversation_transcript.html)**: Click đúp vào file này để mở trên trình duyệt với giao diện bong bóng chat trực quan, sinh động.
2. **[Tệp Markdown](./conversation_transcript.md)**: Phù hợp để đọc trực tiếp trên GitHub hoặc các trình soạn thảo Markdown.
3. **[Tệp JSON](./conversation_transcript.json)**: Chứa dữ liệu có cấu trúc dành cho lập trình viên muốn phân tích sâu.

---

## 🍽️ Landing Pages & Công cụ Copy-Paste nhanh

Tất cả mã nguồn HTML, CSS tối ưu hóa SEO và FAQs cho 10 vùng ngoại ô Sydney đều được tổ chức gọn gàng trong các thư mục tương ứng.

Để chuyển đổi hoặc sao chép mã nguồn nhanh chóng lên các công cụ CMS hoặc Hosting của bạn, hãy sử dụng công cụ **[code_transfer.html](./code_transfer.html)**. Chỉ cần mở file này trên trình duyệt, bạn sẽ có giao diện trực quan hỗ trợ sao chép toàn bộ code của từng file chỉ với 1 cú click!

---

## 🤖 MCP Server & Kỹ năng viết code (MCP Server & Custom Skill)

Dự án này tích hợp một máy chủ MCP hoàn chỉnh dựa trên template `skills-mcp/skills-mcp`. Khi chạy máy chủ này, bạn có thể truyền kỹ năng **`caterking-helper`** cho bất kỳ AI Agent nào tương thích với MCP (như Cursor, Claude Code, Windsurf, VS Code).

### 1. Cài đặt (Installation)
Yêu cầu Node.js cài đặt sẵn trên máy.
```bash
npm install
# hoặc pnpm install / yarn install
```

### 2. Build dự án (Build Server)
```bash
npm run build
```

### 3. Cấu hình vào các AI client (Configuration)

#### Cho Claude Code (`.claudecode.json`):
```json
{
  "mcpServers": {
    "skills-mcp": {
      "command": "node",
      "args": [
        "/path/to/catering-landing-pages-chat/dist/index.js",
        "--skills-dir",
        "/path/to/catering-landing-pages-chat/skills"
      ]
    }
  }
}
```

#### Cho Cursor (`settings` -> `Features` -> `MCP`):
- **Name**: `skills-mcp`
- **Type**: `command`
- **Command**: `node /path/to/catering-landing-pages-chat/dist/index.js --skills-dir /path/to/catering-landing-pages-chat/skills`

Khi được kích hoạt, AI Agent sẽ tự động đọc hiểu kỹ năng tạo trang landing page tối ưu SEO từ file [skills/caterking-helper/SKILL.md](./skills/caterking-helper/SKILL.md) để hỗ trợ bạn tạo các trang tiếp thị chất lượng cao cho bất kỳ khu vực hoặc món ăn nào khác!
