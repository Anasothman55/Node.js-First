import express from 'express';
import * as loginController from '../controllers/auth.js'
import isAuth from '../components/is-auth.js';
import isNotAuth from '../components/is-not-auth.js';

const router = express.Router();

router.get('/login',isAuth, loginController.getlogin)
router.post('/login',isAuth, loginController.postlogin)
router.get('/signup',isAuth, loginController.getSignup);
router.post('/signup',isAuth, loginController.postSignup);
router.post('/logout',isNotAuth, loginController.postlogout)
router.get('/reset', loginController.getReset);
router.post('/reset', loginController.postReset);
router.get('/reset/:token', loginController.getNewPassword);
router.post('/new-password', loginController.postNewPassword);

export default router;
