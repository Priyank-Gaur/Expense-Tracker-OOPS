import { UserModel } from "../schema/user.schema";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthService {

    private secret = process.env.JWT_SECRET || "secret";

    async register(data: any) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return await UserModel.create({ ...data, password: hashedPassword });
    }

    async login(data: any) {
        const user = await UserModel.findOne({ email: data.email });
        if (!user) throw new Error("User not found");

        const isValid = await bcrypt.compare(data.password, user.password || "");
        if (!isValid) throw new Error("Invalid password");

        const token = jwt.sign({ id: user._id, email: user.email }, this.secret, { expiresIn: '1h' });
        return { token, user: { email: user.email, id: user._id } };
    }
}
