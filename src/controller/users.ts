import { Request, Response } from "express";
import { User } from "../validator";
import { registerUser } from "../services";

export default async function createUser(req: Request, res: Response) {
    const userData: User = req.body;

    try {
        await registerUser(userData);
        res.status(202).send("Cadastrado com sucesso!");
        return;
    } catch (error: any) {
        res.status(error.status).send(error.message);
        return;
    }
}