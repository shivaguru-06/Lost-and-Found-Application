import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import mysql from "mysql2";
import { ResultSetHeader } from "mysql2";
import { environment } from "./config/environment";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORTNO;

// Simulated __dirname (safe if you're not using ES Modules)
const __dirname = path.resolve();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Multer storage config
const storage = multer.diskStorage({
  destination: path.join(__dirname, "uploads"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ✅ MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection error:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

// ✅ POST: Lost item
app.post("/api/lost-items", upload.single("image"), (req, res) => {
  let {
    itemName,
    category,
    description,
    lastSeenLocation,
    dateLost,
    contactInfo,
    phone_number,
    address,
  } = req.body;
  console.log(req.body);
  console.log(
    itemName,
    category,
    description,
    lastSeenLocation,
    dateLost,
    contactInfo,
    phone_number,
    address
  );

  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    dateLost = new Date(dateLost).toISOString().slice(0, 10);
  } catch (err) {
    return res.status(400).json({ message: "Invalid date format" });
  }

  const sql = `
    INSERT INTO items (itemName, category, description, lastSeenLocation, dateLost, contactInfo, phone_number, address,  imageUrl)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      itemName,
      category,
      description,
      lastSeenLocation,
      dateLost,
      contactInfo,
      phone_number,
      address,
      imageUrl,
    ],
    (err, result) => {
      if (err) {
        console.error("❌ Error inserting item:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      const insertResult = result as ResultSetHeader;
      res
        .status(201)
        .json({
          message: "✅ Item added successfully",
          itemId: insertResult.insertId,
        });
    }
  );
});

// ✅ GET all lost items
app.get("/api/lost-items", (req, res) => {
  db.query("SELECT * FROM items ORDER BY dateLost DESC", (err, results) => {
    if (err) {
      console.error("❌ Error fetching items:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(200).json(results);
  });
});

// GET lost item by ID
app.get("/api/lost-items/:id", async (req, res) => {
  const itemId = req.params.id;
  console.log("Received request for item ID:", itemId);
  db.query("SELECT * FROM items where id=?", [itemId], (err, results) => {
    if (err) {
      console.error("❌ Error fetching items:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(200).json(results);
  });
});

// PUT lost item by ID
app.put("/api/lost-items/:id", upload.single("image"), async (req, res) => {
  console.log("Received request to update item ID:", req.params.id);
  const itemId = req.params.id;
  const { itemName, category, description, lastSeenLocation, contactInfo } =
    req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  console.log(req.body);
  console.log(itemName, category, description, lastSeenLocation, contactInfo);

  if (!itemName || !category || !description || !contactInfo) {
    console.error("❌ Missing required fields");
    return res.status(400).json({ message: "Missing required fields" });
  }

  const sql = `UPDATE items SET itemName=?, category=?, description=?, lastSeenLocation=?, contactInfo=?, imageUrl=? WHERE id=?`;

  db.query(
    sql,
    [
      itemName,
      category,
      description,
      lastSeenLocation,
      contactInfo,
      imageUrl,
      itemId,
    ],
    (err, result) => {
      if (err) {
        console.error("❌ Error inserting item:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      const insertResult = result as ResultSetHeader;
      res
        .status(201)
        .json({
          message: "✅ Item updated successfully",
          itemId: insertResult.insertId,
        });
    }
  );
});

app.delete("/api/lost-items/:id", async (req: Request, res: Response) => {
  const itemId = req.params.id;
  console.log(itemId);
  try {
    const result = await db.execute("DELETE FROM items WHERE id = ?", [itemId]);
    const deleteResult = result as any;

    if (deleteResult.affectedRows > 0) {
      res.status(200).json({ message: "✅ Item deleted successfully" });
    } else {
      res.status(200).json({ message: "✅ Item deleted successfully" });
    }
  } catch (error) {
    console.error("❌ Error deleting item:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

// ✅ GET all found items
app.get("/api/found-items", (req, res) => {
  db.query(
    "SELECT * FROM Found_Items ORDER BY date_found DESC",
    (err, results) => {
      if (err) {
        console.error("❌ Error fetching items:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json(results);
    }
  );
});

// GET found item by ID
app.get("/api/found-items/:id", async (req, res) => {
  const itemId = req.params.id;
  console.log("Received request for lost item ID:", itemId);
  db.query("SELECT * FROM found_items where id=?", [itemId], (err, results) => {
    if (err) {
      console.error("❌ Error fetching items:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(200).json(results);
  });
});

// ✅ POST: Found item
app.post("/api/found-items", upload.single("image"), (req, res) => {
  console.log("Received request to add found item");
  let {
    item_name,
    category,
    description,
    found_location,
    date_found,
    contact_info,
    phone_number,
    address,
  } = req.body;
  console.log(req.body);
  // console.log(itemName, category, description, lastSeenLocation, dateLost, contactInfo)

  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    date_found = new Date(date_found).toISOString().slice(0, 10);
  } catch (err) {
    return res.status(400).json({ message: "Invalid date format" });
  }

  const sql = `
    INSERT INTO Found_Items (item_name, category, description, found_location, date_found, contact_info, phone_number, address, imageUrl)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      item_name,
      category,
      description,
      found_location,
      date_found,
      contact_info,
      phone_number,
      address,
      imageUrl,
    ],
    (err, result) => {
      if (err) {
        console.error("❌ Error inserting item:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      const insertResult = result as ResultSetHeader;
      res
        .status(201)
        .json({
          message: "✅ Item added successfully",
          itemId: insertResult.insertId,
        });
    }
  );
});

// PUT found item by ID
app.put("/api/found-items/:id", upload.single("image"), async (req, res) => {
  console.log("Received request to update item ID:", req.params.id);
  const itemId = req.params.id;
  const { item_name, category, description, found_location, contact_info } =
    req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  console.log(req.body);
  console.log(item_name, category, description, found_location, contact_info);

  if (!item_name || !category || !description || !contact_info) {
    console.error("❌ Missing required fields");
    return res.status(400).json({ message: "Missing required fields" });
  }

  const sql = `UPDATE found_items SET item_name=?, category=?, description=?, found_location=?, contact_info=?, imageUrl=? WHERE id=?`;

  db.query(
    sql,
    [
      item_name,
      category,
      description,
      found_location,
      contact_info,
      imageUrl,
      itemId,
    ],
    (err, result) => {
      if (err) {
        console.error("❌ Error inserting item:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      const insertResult = result as ResultSetHeader;
      res
        .status(201)
        .json({
          message: "✅ Item updated successfully",
          itemId: insertResult.insertId,
        });
    }
  );
});

//Delete found item by ID
app.delete("/api/found-items/:id", async (req: Request, res: Response) => {
  const itemId = req.params.id;
  console.log(itemId);
  try {
    const result = await db.execute("DELETE FROM found_items WHERE id = ?", [
      itemId,
    ]);
    const deleteResult = result as any;

    if (deleteResult.affectedRows > 0) {
      res.status(200).json({ message: "✅ Item deleted successfully" });
    } else {
      // res.status(404).json({ message: 'item not found' });
      res.status(200).json({ message: "✅ Item deleted successfully" });
    }
  } catch (error) {
    console.error("❌ Error deleting item:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
