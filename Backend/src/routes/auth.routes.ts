import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);

// 🔐 Example protected route
router.get('/me', protect, (req, res) => {
  res.send(`Hello, user with ID ${req.user}`);
});

export default router;
