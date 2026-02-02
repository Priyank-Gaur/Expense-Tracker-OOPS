import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import { ExpenseController } from './controllers/expense.controller';

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

        this.app.post('/api/expenses', expenseController.create);
        this.app.get('/api/expenses', expenseController.getAll);
        this.app.get('/api/expenses/:id', expenseController.getOne);
        this.app.patch('/api/expenses/:id', expenseController.update);
        this.app.delete('/api/expenses/:id', expenseController.delete);
    }
}


