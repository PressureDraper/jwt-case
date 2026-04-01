import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export class AuthController {
    constructor() { }

    public loginAuth = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;

            if (username === process.env.USER_NAME && password === process.env.USER_PASSWORD) {
                const sessionToken = jwt.sign({ username }, process.env.JWT_SECRET as string, { expiresIn: '2m' });
                res.status(200).json({ ok: true, token: sessionToken });
            } else {
                res.status(401).json({ message: 'Authentication failed' });
            }
        } catch (error) {
            res.status(500).json({ message: 'loginAuth: ', error });
        }
    };

    public verifyToken = (req: Request, res: Response) => {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) return res.status(401).json({ message: 'No token provided' });

        jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Failed to authenticate token' });
            }
            res.status(200).json({ ok: true, decoded });
        });
    }
}
