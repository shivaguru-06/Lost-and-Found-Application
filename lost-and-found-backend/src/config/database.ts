import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'shiva', // Replace with your MySQL password
  database: 'lost_and_found',
  waitForConnections: true,
  connectionLimit: 10,
});

export async function initDb() {
  const connection = await db.getConnection();
  try {
    await connection.query('SELECT 1 + 1 AS result');
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection error:', error);
  } finally {
    connection.release();
  }
}