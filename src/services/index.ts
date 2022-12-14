// nivel para aplicação das regras de negócios
import * as validator from "../validator";
import { Database } from "../repositories";
import { options, columns, Isquad, Iuser, resp } from '../interfaces/index'
import * as dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid"
import { Console } from "console";

const secret: string = '222334';

export const registerUser = async (data: Iuser) => {
    try {
        new validator.EmailValidator(data.email);
        new validator.NameValidator(data.username);
        new validator.PasswordValidator(data.password);
        new validator.NameValidator(data.first_name);
        new validator.NameValidator(data.last_name);

        const encryptedPasswd: string = await bcrypt.hash(data.password as string, 10);

        const dataUser: Iuser = {
            id: uuid(),
            username: data.username,
            email: data.email,
            password: encryptedPasswd,
            first_name: data.first_name,
            last_name: data.last_name,
            inactive: false,
            is_admin: false
        }

        const db = new Database();
        console.log("24 regiter serv data", dataUser);
        const response = await db.insertUser(dataUser);

        if (!response.error) {
            return response.data;
        }

    }
    catch (err: any) {
        return { err: err }
    }

}

export const loginUser = async (data: Iuser) => {
    try {
        new validator.EmailValidator(data.email);
        new validator.PasswordValidator(data.password);

        let emailUser = data.email;
        let password = data.password;
        console.log("46", data);
        const db = new Database();
        const response: resp<[Iuser]> = await db.getLogin(emailUser);

        if (!response.err) {
            console.log("62", response)
            const user = response.data![0];

            const compare = await bcrypt.compare(password as string, user.password as string)

            if (!compare) throw new Error;

            const token = jwt.sign(
                {
                    id: user.id,
                    squad: user.squad,
                    is_admin: user.is_admin,
                    inactive: user.inactive,
                    email: user.email
                }, secret,
                { expiresIn: "1d" });

            return { user, token };
        }
    }
    catch (err: any) {
        return { err: err }
    }

}

export const registerTeam = async (data: Isquad) => {
    try {

        new validator.NameValidator(data.name);

        console.log("89", data)
        const dataSquad: Isquad = {
            id: uuid(),
            name: data.name,
            leader: data.leader
        }

        const db = new Database();
        const response = await db.insertSquad(dataSquad);
        if (!response.error) {
            return response.data;
        }

        return;
    }
    catch (err: any) {
        return { err: err };
    }

}

export const getUserMeService = async (id: string) => {
    try {
        const db = new Database();
        const data = await db.getUsersID(id);

        if (!data.error) {
            return data.data;
        }
    }
    catch (err: any) {
        return { err: err }
    }

}

export const getUsersService = async (user: Iuser) => {
    try {
        if (user.is_admin = true) {
            const db = new Database();
            const data = await db.getUsers();

            if (!data.error) {
                return data.data;
            }
        } else { return ("Acesso negado.") }

    }
    catch (err: any) {
        return { err: err }
    }

}

export const getUserByIdService = async (user: Iuser) => {
    try {

        const db = new Database();
        const data = await db.getUsersID(user.id);
        if (!data.error) {
            return data.data;
        }

    }
    catch (err: any) {
        return { err: err }
    }

}

export const getTeamsService = async () => {
    try {

        const db = new Database();
        const data = await db.getSquads();
        if (!data.error) {
            return data.data;
        }

    }
    catch (err: any) {
        return { err: err }
    }

}

export const getTeamByIdService = async (squad: Isquad) => {
    try {
        const db = new Database();
        const data = await db.getSpecificSquad(squad.id);

        if (!data.error) {
            return data.data;
        }
    }
    catch (err: any) {
        return { err: err }
    }

}

export const patchUserService = async (user: Iuser, id: string) => {
    try {

        console.log(id);
        const db = new Database();
        const data = await db.updateUser(id, user);

        if (!data.error) {
            return data.data;
        }

    }
    catch (err: any) {
        return { err: err }
    }

}

export const patchTeamService = async (teamId: string, teamUpdate: Isquad) => {
    try {
        const db = new Database();
        const data = await db.updateSquad(teamId, teamUpdate);

        if (!data.error) {
            return data.data;
        }

    }
    catch (err: any) {
        return { err: err }
    }

}

export const patchMemberService = async (teamId: string, memberUpdate: string) => {
    try {
        const db = new Database();
        const data = await db.insertMemberSquad(teamId, memberUpdate) //recebe usuarios, trocar depois

        if (!data.err) {
            return data.data;
        }

    }
    catch (err: any) {
        return { err: err }
    }

}

export const deleteMemberSquadService = async (memberId: string) => {
    try {
        const db = new Database();
        const data = await db.deletUserSquad(memberId)

        if (!data.error) {
            return data.data;
        }

    }
    catch (err: any) {
        return { err: err }
    }

}

export const deleteUserService = async (userId: string) => {
    try {
        const db = new Database();
        const data = await db.deletUser(userId)

        if (!data.error) {
            return data.data;
        }

    }
    catch (err: any) {
        return { err: err }
    }

}

export const deleteSquadService = async (id: string) => {
    try {
        const db = new Database();
        const data = await db.deletSquad(id)

        if (!data.error) {
            return data.data;
        }

    }
    catch (err: any) {
        return { err: err }
    }

}