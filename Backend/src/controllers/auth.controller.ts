import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/db';
import { generateToken } from '../utils/generateTokens';


export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: 'User already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, passwordHash });

    const token = generateToken(user._id.toString());

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user._id, username: user.username, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id.toString());

    res.json({
      message: 'Login successful',
      user: { id: user._id, username: user.username, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err });
  }
};
