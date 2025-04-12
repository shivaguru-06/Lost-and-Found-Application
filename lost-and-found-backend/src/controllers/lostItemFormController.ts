import { Request, Response } from 'express';
import { db } from '../config/database';

export const createLostItem = async (req: Request, res: Response) => {
  const {
    itemName,
    category,
    description,
    lastSeenLocation,
    dateLost,
    contactInfo,
    phoneNumber,
    address
  } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO items (
        item_name,
        category,
        description,
        last_seen_location,
        date_lost,
        contact_info,
        phone_number,
        address
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        itemName,
        category,
        description,
        lastSeenLocation,
        dateLost,
        contactInfo,
        phoneNumber,
        address
      ]
    );

    res.status(201).json({ id: (result as any).insertId, ...req.body });
  } catch (error) {
    console.error('Error creating lost item:', error);
    res.status(500).json({ message: 'Server error while creating lost item' });
  }
};

export const updateLostItem = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const {
    itemName,
    category,
    description,
    lastSeenLocation,
    dateLost,
    contactInfo,
    phoneNumber,
    address
  } = req.body;

  try {
    await db.query(
      `UPDATE items
       SET item_name = ?,
           category = ?,
           description = ?,
           last_seen_location = ?,
           date_lost = ?,
           contact_info = ?,
           phone_number = ?,
           address = ?
       WHERE id = ?`,
      [
        itemName,
        category,
        description,
        lastSeenLocation,
        dateLost,
        contactInfo,
        phoneNumber,
        address,
        id
      ]
    );

    res.json({ id, ...req.body });
  } catch (error) {
    console.error('Error updating lost item:', error);
    res.status(500).json({ message: 'Server error while updating lost item' });
  }
};

export const deleteLostItem = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    await db.query('DELETE FROM items WHERE id = ?', [id]);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting lost item:', error);
    res.status(500).json({ message: 'Server error while deleting lost item' });
  }
};
