// nivel para aplicação das regras de negócios
import * as validator from "../validator";
import { Database } from "../repositories";
import { options, columns, Isquad, Iuser, resp } from '../interfaces/index'
import * as dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"; 
import {v4 as uuid} from "uuid"

const secret : string = '222334';

export const registerUser = async (data: Iuser) =>{
    try{
        new validator.EmailValidator(data.email);
        new validator.NameValidator(data.username);
        new validator.PasswordValidator(data.password);
        new validator.NameValidator(data.first_name);
        new validator.NameValidator(data.last_name);

        data.id = uuid();
        
        const db = new Database();
        const response = await db.insertUser(data);
        
        if(response.error){
            throw {
                status: 500
            }
        }
        
    }
    catch(err: any){
        return {err: err}
    }

}

export const loginUser = async (data: Iuser) =>{
    try{
        new validator.EmailValidator(data.email);
        new validator.PasswordValidator(data.password);

        let emailUser = data.email;
        let password = data.password;
        console.log("46",data);
        const db = new Database();
        const response : resp<[Iuser]> = await db.getLogin(emailUser);
        
        if(!response.err){
            // console.log("51");
            const user = response.data![0];
            // console.log("53", user.password);
            const compare = await bcrypt.compare(password as string, user.password as string)
            
            if(!compare) throw new Error;
            // console.log("57");
            const token = jwt.sign(
                        { id: user.id,
                          squad: user.squad,
                          is_admin: user.is_admin, 
                          inactive: user.inactive,
                          email: user.email
                        }, secret, 
                        { expiresIn: "1d"});
    
            return {user, token};
        } 
    }
    catch(err: any){
        return {err: err}
    }

}

export const registerTeam = async (data: Isquad) =>{
    try{
        new validator.NameValidator(data.name);
        new validator.NameValidator(data.leader);

        const db = new Database();

        data.id = uuid();
        const response = await db.insertSquad(data);
        if(response.error){
            throw {
                status: 500
            }
        }

        return;
    }
    catch(err : any){
        return {err: err};
    }


}

export const getUserMeService = async (id: string) =>{
    try{
        const db = new Database();
        const data = await db.getUsersID(id);
        
        if(!data.error){
            return data.data;
        }
    }
    catch(err: any){
        return {err: err}
    }

}

export const getUsersService = async (user: Iuser) =>{
    try{
        if (user.is_admin=true){
            const db = new Database();
            const data = await db.getUsers();
            
            if(!data.error){
                return data.data; 
            }       
        } else { return ("Acesso negado.")}
        
    }
    catch(err: any){
        return {err: err}
    }

}

export const getUserByIdService = async (user: Iuser) =>{
    try{
        if (user.is_admin=true){
            const db = new Database();
            const data = await db.getUsersID(user.id);            
            if(!data.error){
                return data.data;      
            }  
        } else { return ("Acesso negado.")}
    }
    catch(err: any){
        return {err: err}
    }

}

export const getTeamsService = async (user: Iuser) =>{
    try{
        if (user.is_admin=true){
            const db = new Database();
            const data = await db.getSquads(); //recebe usuarios, trocar depois       
            if(!data.error){
                return data.data;  
            }      
        } else { return ("Acesso negado.")}
        
    }
    catch(err: any){
        return {err: err}
    }

}

export const getTeamByIdService = async (user: Iuser, squad: Isquad) =>{
    try{
        if (user.is_admin=true){
            const db = new Database();
            const data = await db.getSpecificSquad(squad.id); //pega tabela users, mudar
            
            if(!data.error){
                return data.data; 
            }       
        } else { return ("Acesso negado.")}
        
    }
    catch(err: any){
        return {err: err}
    }

}
