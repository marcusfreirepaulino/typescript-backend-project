import { Request, Response } from "express";
import { User } from "../validator";

import { loginUser, registerUser, getUserMeService, getUsersService, getUserByIdService, getTeamsService, getTeamByIdService } from "../services";
import { Isquad, Iuser, uuid } from "../interfaces";

export async function createUser(req: Request, res: Response) {

    const userData: User = req.body;

    if(!userData) throw new Error;

    try {
        const data = await loginUser(userData);
        res.status(202).send(data);
        return;
    } catch (error: any) {
        res.status(error.status).send(error.message);
        return;
    }
}

export async function getUserLogin(req: Request, res: Response) {
    const userData: User = req.body;

    if (!userData) throw new Error;

    try {
        const data = await loginUser(userData);
        res.status(202).send(data);
        return;
    } catch (error: any) {
        res.status(error.status).send(error.message);
        return;
    }
}

export async function getUserMe(req: Request, res: Response) {
    const userId: string = "123"; //id do próprio usuário

    try {
        const data = await getUserMeService(userId);
        res.status(202).send(data);
        return;
    } catch (error: any) {
        res.status(error.status).send(error.message);
        return;
    }
}

export async function getUsers(req: Request, res: Response) {
    const userId: string = "123"; //id do próprio usuário, pegar do cookie
    const ifAdmin: boolean = true; //se é admin, pegar do cookie
    interface userType {
        id: string,
        is_admin: boolean
    };
    let user: userType = {
        id: userId,
        is_admin: ifAdmin
    }

    try {
        const data = await getUsersService(user);
        res.status(202).send(data);
        return;
    } catch (error: any) {
        res.status(error.status).send(error.message);
        return;
    }
}

export async function getUserById(req: Request, res: Response) {
    const userId: string = "123"; //id do próprio usuário, pegar do cookie
    const ifAdmin: boolean = true; //se é admin, pegar do cookie
    interface userType {
        id: string,
        is_admin: boolean,
        to_read: string
    };
    let user: userType = {
        id: userId,
        is_admin: ifAdmin,
        to_read: req.params.user_id
    }

    try {
        const data = await getUserByIdService(user);
        res.status(202).send(data);
        return;
    } catch (error: any) {
        res.status(error.status).send(error.message);
        return;
    }
}

export async function getTeams(req: Request, res: Response) {
    const userId: string = "123"; //id do próprio usuário, pegar do cookie
    const ifAdmin: boolean = true; //se é admin, pegar do cookie
    interface userType {
        id: string,
        is_admin: boolean
    };
    let user: userType = {
        id: userId,
        is_admin: ifAdmin
    }

    try {
        const data = await getTeamsService(user);
        res.status(202).send(data);
        return;
    } catch (error: any) {
        res.status(error.status).send(error.message);
        return;
    }
}

export async function getTeamById(req: Request, res: Response) {
    const userId: string = "123"; //id do próprio usuário, pegar do cookie
    const ifAdmin: boolean = true; //se é admin, pegar do cookie
    const squadId : uuid = 'aaa';
    let user: Iuser = {
        id: userId,
        is_admin: ifAdmin,
        squad: squadId,
    }

    const squad : Isquad = {
        id: squadId,
        name: 'someName',
        
    }

    try {
        const data = await getTeamByIdService(user, squad);
        res.status(202).send(data);
        return;
    } catch (error: any) {
        res.status(error.status).send(error.message);
        return;
    }
}

