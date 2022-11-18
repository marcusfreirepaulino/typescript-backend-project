// Arquivo para acesso direto ao banco de dados
import { Postegres } from "./ORM/index";
import { options, uuid, columns, Isquad, Iuser, resp } from "../interfaces/index";
import { isBooleanObject } from "util/types";

//Classe para construir os acessos ao banco
export class Database {
    private orm = new Postegres;
    private tables = ["usuario", "equipe"];
    constructor(){}


    public async getLogin(_email? : string){
        try{
            if(!_email) throw new Error("é necessário um email");
            const res = await this.orm.selectUnic('users', ['id', 'email', 'password', 'squad', 'is_admin', 'inactive'], {email: _email});
            if (res.err) throw res.err;
            return {err: null, data: res.data.rows};
        }catch(err){
            return {err: err as Error, data: null};
        }
    }

    //user/users
    public async getUsers(){
        try{
            const res = await this.orm.selectAll('users', ['*']);
            if (res.err) throw res.err;
            return {error: null, data: res.data};
        }catch(err){
            return {error: err as Error, data: null};
        }
    }

    public async getUsersID(_id?: uuid){
        try{
            if(!_id) throw new Error("é necessário um id");
            const res = await this.orm.selectUnic('users', ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'squad', 'is_admin'], {id: _id});
            if (res.err) throw res.err;
            return {error: null, data: res.data};
        }catch(err){
            return {error: err as Error, data: null};
        }
    }
    
    // public async insertUser(id: uuid, username: string, email: string, password: string, first_name: string, last_name: string, squad?: string, is_admin: boolean = false){
    public async insertUser(_user : Iuser){
        try{
            if(!_user.id) throw new Error("Insira um id!");
            if(!_user.username) throw new Error("Insira um username!");
            if(!_user.last_name && !_user.first_name) throw new Error("Insira nome e sobrenome!");
            if(!_user.email) throw new Error("Insira um e-mail!");
            if(!_user.password) throw new Error("Insira uma senha!");
            if(!_user.is_admin) throw new Error("Informe se o usuário inserido é administrador!");

            const res = await this.orm.insert('users', ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'squad', 'is_admin', 'inactive'], _user);
            if (res.err) throw res.err;
            return {error: null, data: res.data};
        }catch(err){
            return {error: err as Error, data: null};
        }
    };


    public async insertMemberSquad(idUser: uuid, idSquad: uuid) : Promise<resp<any>> {
        try{
            if(!idUser) throw new Error("Insira inserir a id do user");
            if(!idSquad) throw new Error("Insira inserir a id da equipe");

            const res = await this.orm.updateMember('users', [idUser, idSquad]);
            if (res.err) throw res.err;
            return {err: null, data: res.data};
        }catch(err){
            return {err: err as Error, data: null};
        }
    };
    
    // public async updateUser(id?: uuid, username?: string, email?: string, password?: string, first_name?: string, last_name?: string, squad?: string, is_admin: boolean = false){
    public async updateUser(_user: Iuser){

        try{
            const res = await this.orm.update('users', ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'squad', 'is_admin', 'inactive'], _user);
            if (res.err) throw res.err;
            return {error: null, data: res.data};
        }catch(err){
            return {error: err as Error, data: null};
        }
    }

    public async deletUser(_id: uuid){
        try{
            const res = await this.orm.softDelete(_id);
            if (res.err) throw res.err;
            return {error: null, data: res.data};
        }catch(err){
            return {error: err as Error, data: null};
        }
    }

    public async deletUserSquad(_id: uuid){
        try{
            const res = await this.orm.deleteMemberSquad(_id);
            if (res.err) throw res.err;
            return {error: null, data: res.data};
        }catch(err){
            return {error: err as Error, data: null};
        }
    }

    //Squad/Squads
    public async getSquads() {
        try{
            const res = await this.orm.selectAll('Isquad', ['id', 'name', 'leader']);
            if (res.err) throw res.err;
            return {error: null, data: res.data};
        }catch(err){
            return {error: err as Error, data: null};
        }
    }

    public async getSpecificSquad(id?: uuid) {
        try{
            if(!id) throw new Error("é necessário um id");
            const res = await this.orm.selectUnic('Isquad', ['id', 'name', 'leader'], {id: id});
            if (res.err) throw res.err;
            return {error: null, data: res.data};
        }catch(err){
            return {error: err as Error, data: null};
        }
    }

    // public async insertSquad(id: uuid, name: string, leader: uuid){
    public async insertSquad(_squad: Isquad){
        try{
            if(!_squad.id) throw new Error("Insira um id válido!");
            if(!_squad.name) throw new Error("Insira um name válido!");
            if(!_squad.leader) throw new Error("Insira um lider para a equipe!");

            const res = await this.orm.insert('squads', ['id', 'name', 'leader'], _squad);
            if (res.err) throw res.err;
            return {error: null, data: res.data};
        }catch(err){
            return {error: err as Error, data: null};
        }
    }

    public async updateSquad(_squad : Isquad){
        try{
            const res = await this.orm.insert('squads', ['id', 'name', 'leader'], _squad);
            if (res.err) throw res.err;
            return {error: null, data: res.data};
        }catch(err){
            return {error: err as Error, data: null};
        }
    }

    public async deletSquad(_id: uuid){
        try{
            const res = await this.orm.delete(_id);
            if (res.err) throw res.err;
            return {error: null, data: res.data};
        }catch(err){
            return {error: err as Error, data: null};
        }
    }
    
}