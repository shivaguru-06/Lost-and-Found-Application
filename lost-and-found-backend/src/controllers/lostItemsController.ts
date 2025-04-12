import { Request, Response } from 'express';
import { db } from '../config/database';

export const getLostItems = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query('SELECT * FROM lost_items ORDER BY date_lost DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching lost items:', error);
    res.status(500).json({ message: 'Server error while fetching lost items' });
  }
};

export const getLostItemById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const [rows] = await db.query('SELECT * FROM lost_items WHERE id = ?', [id]);
    if (Array.isArray(rows) && rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Lost item not found' });
    }
  } catch (error) {
    console.error('Error fetching lost item:', error);
    res.status(500).json({ message: 'Server error while fetching lost item' });
  }
};