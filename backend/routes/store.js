import express from 'express';
import StoreController from '../controllers/storeController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

router.use(authenticate); // if routes need authentication

router.get('/', StoreController.getAllStores);
router.get('/:id', StoreController.getStoreById);

export default router;
