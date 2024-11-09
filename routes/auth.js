import express from 'express';
import * as loginController from '../controllers/login.js'

const router = express.Router();

router.get('/login', loginController.getlogin)
router.post('/login', loginController.postlogin)
router.post('/logout', loginController.postlogout)

export default router;
