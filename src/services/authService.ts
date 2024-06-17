import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Utilisez les variables d'environnement

export const signUp = async (email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        });
    } catch (error) {
        throw new Error('User already exists');
    }
};

export const signIn = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    return token;
};