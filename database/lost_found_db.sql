-- Creation of database

CREATE DATABASE IF NOT EXISTS lost_found_db;
USE lost_found_db;

-- Lost items table with name items

CREATE TABLE IF NOT EXISTS items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  itemName VARCHAR(100),
  category VARCHAR(50),
  description TEXT,
  lastSeenLocation VARCHAR(255),
  dateLost DATE,
  contactInfo VARCHAR(100),
  imageUrl VARCHAR(255)
);
ALTER TABLE items
ADD COLUMN phone_number VARCHAR(15),
ADD COLUMN address TEXT;

ALTER TABLE items ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- To get all items from lost items table
SELECT * FROM lost_found_db.items;


-- Creation of Found items table

CREATE TABLE Found_Items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    item_name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    found_location VARCHAR(255) NOT NULL,
    date_found DATE NOT NULL,
    contact_info VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE Found_Items
ADD COLUMN imageUrl VARCHAR(255);

ALTER TABLE Found_Items
ADD COLUMN phone_number VARCHAR(15),
ADD COLUMN address TEXT;

-- To get all items from found items table
SELECT * FROM lost_found_db.found_items;

