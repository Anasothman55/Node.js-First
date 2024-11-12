import express from 'express';
import * as productControllers from '../controllers/admin.js';
import isNotAuth from '../components/is-not-auth.js';
import { check,body } from 'express-validator';
const router = express.Router();


router.get('/add-product',isNotAuth,productControllers.getAddProduct)
router.post('/add-product',[
  body('title').isString().isLength({min:3}).trim(),
  body('price').isFloat(),
  body('description').isLength({min:10, max:500}).trim()
],isNotAuth,productControllers.postAddProduct)
router.get('/edit-product/:id',isNotAuth,productControllers.getEditProduct)
router.delete('/product/:productId',isNotAuth,productControllers.deleteProduct)
router.post('/edit-product',[
  body('title').isString().isLength({min:3}).trim(),
  body('price').isFloat(),
  body('description').isLength({min:10, max:500}).trim()
],isNotAuth,productControllers.postEditProduct)
router.get('/product',isNotAuth,productControllers.getAllProduct)


export default router;
