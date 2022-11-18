import { Response, Request, NextFunction } from 'express'
import * as dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
const secret: string = '222334';
import { Database } from '../repositories/index';

// jwtAdmin -> libera acesso apenas para o Admin ->
const authAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const [, token] = req.headers.authorization!.split(" ");

    console.log("11", token);

    try {

        const payload: any = jwt.verify(token, secret);

        if (payload.is_admin) {
            console.log("19 authAdmin");
            next();
        }

    } catch (error) {
        res.status(401).send('Falha na autenticação do usuário');
    }
};

// jwtLog -> libera acesso apenas para usuarios logados
const authLog = async (req: Request, res: Response, next: NextFunction) => {
    const [, token] = req.headers.authorization!.split(" ");

    try {

        const payload: any = jwt.verify(token, secret);

        if (payload) {
            next();
        }

    } catch (error) {
        res.status(401).send('Falha na autenticação do usuário');
    }
};

// jwtLider -> libera acesso apenas para o líder e o admin -> 
const authAdminLider = async (req: Request, res: Response, next: NextFunction) => {
    const [, token] = req.headers.authorization!.split(" ");

    try {

        const payload: any = jwt.verify(token, secret);

        console.log("42", payload);
        console.log("43", payload.is_admin);

        if (payload.is_admin) {
            next();
        }
        if (payload.squad) {
            console.log("42 AuthAL");
            const db = new Database();
            const data = await db.getSpecificSquad(payload.squad);
            console.log("45 AuthAdminLider")
            // if(data.error) 
            next();
        }

    } catch (error) {
        res.status(401).send('Falha na autenticação do usuário');
    }
};


// const authUser = async (req : Request, res : Response, next : NextFunction) => {
//     const [, token] = req.headers.authorization!.split(" ");

//     try {

//         const payload : any = jwt.verify(token, secret);
//         //@ts-ignore
//         // req.auth = {
//         //     id: payload.id,
//         // };
//         console.log("19", payload);
//         console.log("20", payload.is_admin);

//         if (payload.is_admin) {  
//             next();
//         }
//         else {
//             return res.send("Acesso negado!");
//         }

//     } catch (error) {
//         res.status(401).send('Falha na autenticação do usuário');
//     }
// };


// jwtLiderAdmin -> libera acesso apenas para o Admin e o lider


export { authAdmin, authAdminLider, authLog };