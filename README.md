# 建筑行业出退勤管理系统

本仓库为建筑行业工地考勤及费用管理系统的原型，包含 Node.js (Express) 后端与 Vue 3 前端。现已实现注册、登录和基础接口，后续将逐步完善出退勤、费用申请、审批、通知、统计等模块。

---

## 技术栈

- 后端：Node.js、Express、Sequelize、MySQL
- 前端：Vue 3、Element Plus、Axios
- 其它：dotenv（环境变量）、JWT（鉴权）

---

## 目录结构

```
.
├── backend/              # Node.js 后端代码
│   ├── index.js
│   ├── db.js
│   ├── models/
│   │   ├── User.js
│   │   └── ...          # 更多模型
│   ├── .env             # 环境变量（勿提交，见 .env.example）
│   └── package.json
├── frontend/             # Vue 3 前端代码
│   ├── src/
│   │   ├── main.js
│   │   ├── App.vue
│   │   ├── views/
│   │   │   └── Login.vue
│   │   └── ...
│   ├── vue.config.js
│   └── package.json
├── AGENTS.md             # 功能模块与分工说明
├── README.md
└── .gitignore
```

---

## 快速启动

### 1. 后端

> **首次启动前请先配置 MySQL 并新建数据库（如 attendance_db）**

- 配置 `backend/.env` 文件，参考 `.env.example` 填写数据库账号和 JWT 密钥。

- 安装依赖并启动服务：

```bash
cd backend
npm install
npm run dev      # 或 npm start
```

- 访问 http://localhost:3000/ping 检查服务

### 2. 前端

- 配置代理（如需跨域，在 vue.config.js 里设置 /api 代理）

- 安装依赖并启动开发环境：

```bash
cd frontend
npm install
npm run serve    # Vue CLI 项目用 serve，若为 Vite 项目用 npm run dev
```

- 访问 http://localhost:8080/login 体验登录页，登录后进入仪表盘，可在侧边栏切换到出勤管理等页面

---

## 数据库建表

推荐使用以下 SQL 创建核心数据表（users, projects, attendance, expenses 等）：

<details>
<summary>点击展开建表SQL</summary>

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'employee',
    real_name VARCHAR(50),
    phone VARCHAR(20),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(20),
    address VARCHAR(255),
    description VARCHAR(255),
    status VARCHAR(20) DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    project_id INT NOT NULL,
    check_in DATETIME,
    check_out DATETIME,
    day_wage DECIMAL(10,2),
    note VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_attendance_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_attendance_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    project_id INT NOT NULL,
    type VARCHAR(20) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    description VARCHAR(255),
    status VARCHAR(20) DEFAULT 'pending',
    applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    approved_at DATETIME,
    approver_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_expenses_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_expenses_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    CONSTRAINT fk_expenses_approver FOREIGN KEY (approver_id) REFERENCES users(id) ON DELETE SET NULL
);
```
</details>

---

## 主要功能模块（AGENTS拆分）

详见 AGENTS.md，涵盖：
- 认证与权限（注册、登录、JWT）
- 基础信息（员工、工地/项目）
- 出退勤管理
- 费用申请与审批
- 通知与消息
- 统计与报表导出

---

## 常见问题与待办

- 后端 `.env` 请勿提交敏感信息，建议用 `.env.example` 作为参考模板
- 请勿将 `node_modules` 提交入库（确保 `.gitignore` 正确）
- 部分脚本/配置（如 package.json 的启动命令、vue.config.js 的代理）如有改动请及时同步文档
- 后续建议完善自动化测试、安全校验等

---

## 贡献与协作

欢迎提 Issue 或 PR，建议按 AGENTS.md 功能模块分工协作。  
如需更多文档或前后端代码范例，请参考 docs/ 或联系维护者。
