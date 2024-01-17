const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const app = express();
const port = 8888;
app.use(cors());
// 中间件，用于解析 JSON 请求体
app.use(express.json());

// 创建 MySQL 数据库连接
const db = mysql.createConnection({
  host: 'localhost',
  user: 'test123',
  password: 'f5TBwpsxEyFPNjFe',
  database: 'group',
});

// 连接到 MySQL 数据库
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// API 路由，从数据库获取数据
app.get('/api/data1', (req, res) => {
  // 执行数据库查询
  const query = 'SELECT * FROM JW';
  db.query(query, (err, results1) => {
    res.json(results1);
  });
});
app.get('/api/data2', (req, res) => {
  // 执行数据库查询
  const query = 'SELECT * FROM JW_copy1';
  db.query(query, (err, results2) => {
    res.json(results2);
  });
});

app.get('/page1', (req, res) => {
  // 发送整个 HTML 文件
 res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/page2', (req, res) => {
  // 发送整个 HTML 文件
 res.sendFile(path.join(__dirname + '/map.html'));
});

app.get('/page3', (req, res) => {
  // 发送整个 HTML 文件
 res.sendFile(path.join(__dirname + '/image.html'));
});

app.get('/page4', (req, res) => {
  // 发送整个 HTML 文件
 res.sendFile(path.join(__dirname + '/video.html'));
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'test/'); // 存储视频的目录
   
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // 保留原始文件名

  }
});

const upload = multer({ storage: storage });

//处理视频文件上传请求
app.post('/api/upload', upload.single('video'), (req, res) => {
  // 在此处处理视频上传成功后的逻辑
  const videoUrl = `http://115.29.205.84:8888/api/uploaded/${req.file.filename}`;
  res.status(200).json({ videoUrl });
});


app.get('/api/images/:id', (req, res) => {
  const imageId = req.params.id;

  // 查询数据库获取图像数据
  const query = 'SELECT image_data FROM image_test WHERE id = ?';

  db.query(query, [imageId], (err, results) => {
    if (err) {
      console.error('Error querying image data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('Image Not Found');
      return;
    }

    // 获取图像数据
    const imageData = results[0].image_data;

    // 设置响应头，指定内容类型为图片类型
    res.contentType('image/jpeg'); // 假设图像数据是 JPEG 格式

    // 将图像数据发送给前端
    res.send(imageData  );
  });
});
app.use(express.static(path.join(__dirname, 'test')));
app.use('/api/uploaded', express.static(path.join(__dirname, 'test')));

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});