import { ExpenseModel } from "../schema/expense.schema";

export class ExpenseService {
    async createExpense(data: any) {
        const lastExpense = await ExpenseModel.findOne().sort({ srNo: -1 });
        const nextSrNo = (lastExpense && lastExpense.srNo) ? lastExpense.srNo + 1 : 1;
        const newData = { ...data, srNo: nextSrNo };
        return await ExpenseModel.create(newData);
    }

    async getAllExpenses() {
        return await ExpenseModel.find();
    }

    async getExpenseById(id: string) {
        return await ExpenseModel.findOne({ srNo: Number(id) });
    }

    async updateExpense(id: string, data: any) {
        return await ExpenseModel.findOneAndUpdate({ srNo: Number(id) }, data, { new: true });
    }

    async deleteExpense(id: string) {
        return await ExpenseModel.findOneAndDelete({ srNo: Number(id) });
    }
}
