import { Router } from 'express';
import { getAppInfo } from '../controllers/appController';

const router = Router();

router.get('/', getAppInfo);

export default router;