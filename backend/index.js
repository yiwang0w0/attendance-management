const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize = require('./db');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

// JWT 验证中间件
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: '未登录或Token缺失' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ error: 'Token 无效' });
  }
};

// 健康检查
app.get('/ping', (req, res) => res.send('pong'));

// 注册接口
app.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, password: hash, role });
    res.json({ message: '注册成功', user: { id: user.id, username: user.username, role: user.role } });
  } catch (e) {
    res.status(400).json({ error: '用户名已存在' });
  }
});

// 登录接口
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) return res.status(400).json({ error: '用户名不存在' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: '密码错误' });

  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2d' });
  res.json({ message: '登录成功', token, user: { id: user.id, username: user.username, role: user.role } });
});

// 登出接口
app.post('/logout', auth, (req, res) => {
  // 前端清除token即可，服务器端不做状态保存
  res.json({ message: '登出成功' });
});

// 一定要等数据库sync后再启动服务
sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
});
