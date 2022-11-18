import { Response, Request, NextFunction } from 'express'
import * as dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
const secret: string = '222334';
// import { Database } from '../repositories/index';

const authAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const [, token] = req.headers.authorization!.split(" ");

    console.log("11", token);

    try {

        const payload: any = jwt.verify(token, secret);

        if (payload.is_admin) {
            next();
        }

    } catch (error) {
        res.status(401).send('Falha na autenticação do usuário');
    }
};

// const authLider = async (req : Request, res : Response, next : NextFunction) => {
//     const [, token] = req.headers.authorization!.split(" ");

//     try {

//         const payload : any = jwt.verify(token, secret);

//         console.log("42", payload);
//         console.log("43", payload.is_admin);

//         if (payload.squad) {  

//             const db = new Database();
//             const data = await db.getSpecificSquad(payload.squad);

//             if(data.error) next();
//         }
//         else {
//             return res.send("Acesso negado!");
//         }

//     } catch (error) {
//         res.status(401).send('Falha na autenticação do usuário');
//     }
// };

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

export { authAdmin };