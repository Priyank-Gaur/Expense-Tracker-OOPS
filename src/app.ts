import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import { ExpenseController } from './controllers/expense.controller';
import { AuthController } from './controllers/auth.controller';
import { authMiddleware } from './middlewares/auth.middleware';

interface App_Interface {
    startServer(): void;
    connectDB(): void;
    initailizeRoutes(): void;
}


export default class App implements App_Interface {
    PORT: number;
    app: express.Application;

    constructor() {
        console.log("Initializing App Constructor...");
        this.PORT = Number(process.env.PORT) || 4000;
        this.app = express()
        this.startServer()
        this.initailizeRoutes()
        this.connectDB()
    }

    startServer(): void {
        try {
            this.app.listen(this.PORT, () => {
                console.log(`Server is running on http://localhost:${this.PORT}`)
            })
        } catch (e) {
            console.error("Error starting server:", e);
        }
    }

    async connectDB(): Promise<void> {
        try {
            console.log("Attempting to connect to DB...");
            await mongoose.connect(process.env.MONGODB_URL as string)
            console.log("DB connected successfully")
        }
        catch (error) {
            console.error("DB Connection Error:", error)
        }
    }

    initailizeRoutes(): void {
        console.log("Initializing Routes...");
        this.app.use(express.json())
        const expenseController = new ExpenseController();
        const authController = new AuthController();

        this.app.post('/api/auth/register', authController.register);
        this.app.post('/api/auth/login', authController.login);

        this.app.post('/api/expenses', authMiddleware, expenseController.create);
        this.app.get('/api/expenses', authMiddleware, expenseController.getAll);
        this.app.get('/api/expenses/:id', authMiddleware, expenseController.getOne);
        this.app.patch('/api/expenses/:id', authMiddleware, expenseController.update);
        this.app.delete('/api/expenses/:id', authMiddleware, expenseController.delete);
    }
}
