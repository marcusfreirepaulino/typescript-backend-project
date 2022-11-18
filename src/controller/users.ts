import { Request, Response } from "express";
import { User } from "../validator";
import { loginUser, registerUser, getUserMeService, getUsersService, getUserByIdService, getTeamsService, getTeamByIdService, registerTeam, patchUserService, patchTeamService, patchMemberService, deleteMemberSquadService, deleteUserService, deleteSquadService } from "../services/index";

import { Isquad, Iuser, uuid } from "../interfaces";
// import * as dotenv from 'dotenv';
// dotenv.config();
import jwt from 'jsonwebtoken';
const secret: string = '222334';

export async function createUser(req: Request, res: Response) {

    const userData: User = req.body;

    if (!userData) throw new Error;

    try {
        console.log("createUser controllers")
        const data = await registerUser(userData);
        res.status(202).send(data);
        return;
    } catch (error: any) {
        res.status(error.status).send(error.message);
        return;
    }
}

export async function createTeam(req: Request, res: Response) {

    try {

        const teamData: Isquad = req.body;
        if (!teamData) throw new Error;
        const data = await registerTeam(teamData);
        res.status(202).send({message: "Equipe cadastrada!"});
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

    try {

        const [, token] = req.headers.authorization!.split(" ");
        const payload: any = jwt.verify(token, secret);

        if (payload.id) {
            const data = await getUserMeService(payload.id);
            res.status(202).send(data);
            return;
        }

    } catch (error: any) {
        res.status(error.status).send(error.message);
        return;
    }
}

export async function getUsers(req: Request, res: Response) {
    /* const userid = req.auth.id; */
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

    let user: Iuser = {
        id: req.params.user_id
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

    try {
        const data = await getTeamsService();
        res.status(202).send(data);
        return;
    } catch (error: any) {
        res.status(error.status).send(error.message);
        return;
    }
}

export async function getTeamById(req: Request, res: Response) {

    const squad: Isquad = {
        id: req.params.team_id,
    }

    try {
        const data = await getTeamByIdService(squad);
        res.status(202).send(data);
        return;
    } catch (error: any) {
        res.status(error.status).send(error.message);
        return;
    }
}


export async function patchUser(req: Request, res: Response) {
    
    const userData: Iuser = req.body;
    const id : string = req.params.user_id;

    if(!userData) throw new Error;

    try {
        const data = await patchUserService(userData, id);
        res.status(202).send(data);
        return;
    } catch (error: any) {
        res.status(error.status).send(error.message);
        return;
    }
}

export async function patchTeam(req: Request, res: Response) {
    const teamId = req.params.team_id;
    const teamUpdate: Isquad = req.body;

    const userId: string = "123"; //id do próprio usuário, pegar do cookie
    const ifAdmin: boolean = true; //se é admin, pegar do cookie
    let user: Iuser = {
        id: userId,
        is_admin: ifAdmin,
        squad: teamId,
    }

    try {
        const data = await patchTeamService(user, teamUpdate);
        res.status(202).send(data);
        return;
    } catch (error: any) {
        res.status(error.status).send(error.message);
        return;
    }
}

export async function patchMember(req: Request, res: Response) {
    const teamId: uuid = req.params.team_id;
    const memberUpdate: Iuser = req.body;

    const userId: string = "123"; //id do próprio usuário, pegar do cookie
    const ifAdmin: boolean = true; //se é admin, pegar do cookie
    let user: Iuser = {
        id: userId,
        is_admin: ifAdmin,
        squad: teamId,
    }

    try {
        const data = await patchMemberService(user, teamId, memberUpdate);
        res.status(202).send(data);
        return;
    } catch (error: any) {
        res.status(error.status).send(error.message);
        return;
    }
}

export async function deleteMemberSquad(req: Request, res: Response) {
    const teamId: uuid = req.params.team_id;

    let userChange: Iuser = {
        id: req.params.user_id,
        squad: null,
    }

    const userId: string = "123"; //id do próprio usuário, pegar do cookie
    const ifAdmin: boolean = true; //se é admin, pegar do cookie
    let user: Iuser = {
        id: userId,
        is_admin: ifAdmin,
        squad: teamId,
    }

    try {
        const data = await deleteMemberSquadService(user, teamId, userChange);
        res.status(202).send(data);
        return;
    } catch (error: any) {
        res.status(error.status).send(error.message);
        return;
    }
}

export async function deleteUser(req: Request, res: Response) {
    const id: uuid = req.params.user_id;

    const userId: string = "123"; //id do próprio usuário, pegar do cookie
    const ifAdmin: boolean = true; //se é admin, pegar do cookie
    let user: Iuser = {
        id: userId,
        is_admin: ifAdmin
    }

    try {
        const data = await deleteUserService(id, user);
        res.status(202).send(data);
        return;
    } catch (error: any) {
        res.status(error.status).send(error.message);
        return;
    }
}

export async function deleteSquad(req: Request, res: Response) {
    const id: uuid = req.params.team_id;

    const userId: string = "123"; //id do próprio usuário, pegar do cookie
    const ifAdmin: boolean = true; //se é admin, pegar do cookie
    let user: Iuser = {
        id: userId,
        is_admin: ifAdmin
    }

    try {
        const data = await deleteSquadService(id, user);
        res.status(202).send(data);
        return;
    } catch (error: any) {
        res.status(error.status).send(error.message);
        return;
    }
}