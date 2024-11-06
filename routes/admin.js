import express from 'express';
import * as productControllers from '../controllers/admin.js';

const router = express.Router();

router.get('/add-product',productControllers.getAddProduct)
router.post('/add-product',productControllers.postAddProduct)
router.get('/edit-product/:id',productControllers.getEditProduct)
router.post('/delete-product',productControllers.deleteProduct)
router.post('/edit-product',productControllers.postEditProduct)
router.get('/product', productControllers.getAllProduct)


export default router;
