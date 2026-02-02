import { Schema, Document, model } from "mongoose";

export interface UserInterface extends Document {
    email: string;
    password?: string;
}

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

export const UserModel = model<UserInterface>('user', UserSchema);
