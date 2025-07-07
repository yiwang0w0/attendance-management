# 建筑行业出退勤管理系统

## 项目简介

本系统用于建筑行业工地员工出退勤、费用、审批及统计管理。系统包括后台管理端（Vue3 + Element Plus）、后端API（Node.js + Express），数据存储采用MySQL。

---

## 技术栈

- 前端：Vue3, Element Plus, Axios
- 后端：Node.js, Express, Sequelize（ORM）
- 数据库：MySQL
- 工具：Docker（可选），Git

---

## 快速启动

### 1. 克隆代码

```bash
git clone https://your.repo.address/attendance-management.git
cd attendance-management

2. 前端项目启动
cd frontend
npm install
npm run dev
# 默认启动 http://localhost:5173

3. 后端项目启动
cd backend
npm install
cp .env.example .env    # 配置数据库等信息
npm run dev
# 默认启动 http://localhost:3000

4. 数据库初始化
安装MySQL，创建数据库（如 attendance_db）
配置 backend/.env 里的数据库连接信息
可用 Sequelize 自动建表/同步
```
