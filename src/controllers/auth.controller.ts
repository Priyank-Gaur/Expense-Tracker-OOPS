import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    register = async (req: Request, res: Response) => {
        try {
            const user = await this.authService.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const result = await this.authService.login(req.body);
            res.json(result);
        } catch (error) {
            res.status(401).json({ error: error });
        }
    }
}
