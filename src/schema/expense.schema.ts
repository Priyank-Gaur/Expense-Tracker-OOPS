import { Schema, Document, model } from "mongoose";

export interface ExpenseInterface extends Document {
    title: string;
    description: string;
    amount: number;
    date: Date;
    srNo: number;
}

const ExpenseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    srNo: { type: Number, required: false }
});

export const ExpenseModel = model('expense', ExpenseSchema);
