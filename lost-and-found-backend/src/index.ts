import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import mysql from 'mysql2';
import { ResultSetHeader } from 'mysql2';

const app = express();
const PORT = 3000;

// Simulated __dirname (safe if you're not using ES Modules)
const __dirname = path.resolve();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Multer storage config
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'uploads'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// ✅ MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'shiva',
  database: 'lost_found_db'
});

db.connect(err => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
  } else {
    console.log('✅ Connected to MySQL');
  }
});

// ✅ POST: Lost item
app.post('/api/lost-items', upload.single('image'), (req, res) => {
  let { itemName, category, description, lastSeenLocation, dateLost, contactInfo } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    dateLost = new Date(dateLost).toISOString().slice(0, 10);
  } catch (err) {
    return res.status(400).json({ message: 'Invalid date format' });
  }

  const sql = `
    INSERT INTO items (itemName, category, description, lastSeenLocation, dateLost, contactInfo, imageUrl)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [itemName, category, description, lastSeenLocation, dateLost, contactInfo, imageUrl], (err, result) => {
    if (err) {
      console.error('❌ Error inserting item:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    const insertResult = result as ResultSetHeader;
    res.status(201).json({ message: '✅ Item added successfully', itemId: insertResult.insertId });
  });
});

// ✅ GET all lost items
app.get('/api/lost-items', (req, res) => {
  db.query('SELECT * FROM items ORDER BY dateLost DESC', (err, results) => {
    if (err) {
      console.error('❌ Error fetching items:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json(results);
  });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
