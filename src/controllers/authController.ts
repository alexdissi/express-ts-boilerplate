import { Request, Response } from 'express';
import { signUp, signIn } from '../services/authService';

export const signUpController = async (req: Request, res: Response) => {
    try {
        await signUp(req.body.email, req.body.password);
        res.json({ message: 'User created successfully'});
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const signInController = async (req: Request, res: Response) => {
    try {
        const token = await signIn(req.body.email, req.body.password);
        res.json({ token });
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
};