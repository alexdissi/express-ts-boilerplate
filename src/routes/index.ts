import { Router } from 'express';
import { signUpController, signInController } from '../controllers/authController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/auth/signup', signUpController);
router.post('/auth/signin', signInController);
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: (req as any).user });
});

export default router;