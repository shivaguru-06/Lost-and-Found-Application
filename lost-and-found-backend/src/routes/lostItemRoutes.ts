import { Router } from 'express';
import { getLostItems, getLostItemById } from '../controllers/lostItemsController';
import { createLostItem, updateLostItem, deleteLostItem } from '../controllers/lostItemFormController';

const router = Router();

router.get('/lost-items', getLostItems);
router.get('/lost-items/:id', getLostItemById);
router.post('/lost-items', createLostItem);
router.put('/lost-items/:id', updateLostItem);
router.delete('/lost-items/:id', deleteLostItem);

export default router;