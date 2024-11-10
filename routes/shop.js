import express from 'express';
import * as shopControllers from '../controllers/shop.js';
import isNotAuth from '../components/is-not-auth.js';
const router = express.Router();

router.get('/', shopControllers.getIndex)
router.get('/product', shopControllers.getProduct)
router.get('/product/:id', shopControllers.getOneProduct)
router.get('/cart',isNotAuth, shopControllers.getCart)
router.post('/cart',isNotAuth, shopControllers.postToCart)
router.post('/caer-delete-item',isNotAuth, shopControllers.postDeleteCartItem )
router.post('/crate-order',isNotAuth, shopControllers.postOrder)
router.get('/checkout',isNotAuth, shopControllers.getCheckout)
router.get('/orders',isNotAuth, shopControllers.getOrder)



export default router;