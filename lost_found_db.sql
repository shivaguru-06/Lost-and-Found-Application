CREATE DATABASE IF NOT EXISTS lost_found_db;
USE lost_found_db;

CREATE TABLE IF NOT EXISTS items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  description TEXT,
  date_lost DATE
);
ALTER TABLE items ADD COLUMN imageUrl VARCHAR(255);
DROP TABLE IF EXISTS items;



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




