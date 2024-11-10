import express from 'express';
import * as productControllers from '../controllers/admin.js  ';
import isNotAuth from '../components/is-not-auth.js';

const router = express.Router();


router.get('/add-product',isNotAuth,productControllers.getAddProduct)
router.post('/add-product',isNotAuth,productControllers.postAddProduct)
router.get('/edit-product/:id',isNotAuth,productControllers.getEditProduct)
router.post('/delete-product',isNotAuth,productControllers.deleteProduct)
router.post('/edit-product',isNotAuth,productControllers.postEditProduct)
router.get('/product',isNotAuth,productControllers.getAllProduct)


export default router;
