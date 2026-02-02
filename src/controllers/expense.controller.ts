import { Request, Response } from "express";
import { ExpenseService } from "../services/expense.service";

export class ExpenseController {
    expenseService = new ExpenseService();

    create = async (req: Request, res: Response) => {
        try {
            const expense = await this.expenseService.createExpense(req.body);
            res.status(201).json(expense);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const expenses = await this.expenseService.getAllExpenses();
            res.json(expenses);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    getOne = async (req: Request, res: Response) => {
        try {
            const expense = await this.expenseService.getExpenseById(req.params.id as string);
            res.json(expense);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const expense = await this.expenseService.updateExpense(req.params.id as string, req.body);
            res.json(expense);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            await this.expenseService.deleteExpense(req.params.id as string);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}
