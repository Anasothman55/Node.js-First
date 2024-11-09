import express from 'express';
import * as shopControllers from '../controllers/shop.js';

const router = express.Router();

router.get('/', shopControllers.getIndex)
router.get('/product', shopControllers.getProduct)
router.get('/product/:id', shopControllers.getOneProduct)
router.get('/cart', shopControllers.getCart)
router.post('/cart', shopControllers.postToCart)
router.post('/caer-delete-item', shopControllers.postDeleteCartItem )
router.post('/crate-order', shopControllers.postOrder)
router.get('/checkout', shopControllers.getCheckout)
router.get('/orders', shopControllers.getOrder)



export default router;