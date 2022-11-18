// Arquivo para acesso direto ao banco de dados
import { Postegres } from "./ORM/index";
import { options, uuid, columns, Isquad, Iuser, resp } from "../interfaces/index";
import { isBooleanObject } from "util/types";

//Classe para construir os acessos ao banco
export class Database {
    private orm = new Postegres;
    private tables = ["usuario", "equipe"];
    constructor(){}



    //user/users
    public async getLogin(_email?: string){
        try{
            if(!_email) throw new Error("é necessário um email");
            const res = await this.orm.selectUnic('users', ['username', 'email', 'password'], {email: _email});
            if (res.err) throw res.err;
            return {error: null, data: res.data.rows};

        }catch(err){
            return {error: err as Error, data: null};
        }
    }


    public async getUsers(){
        try{
            const res = await this.orm.selectAll('users', ['*']);
            if (res.err) throw res.err;
            return {error: null, data: res.data.rows};
        }catch(err){
            return {error: err as Error, data: null};
        }
    }

    public async getUsersID(_id?: uuid){
        try{
            if(!_id) throw new Error("é necessário um id");
            const res = await this.orm.selectUnic('users', ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'squad', 'is_admin'], {id: _id});
            if (res.err) throw res.err;
            return {error: null, data: res.data.rows};

        }catch(err){
            return {error: err as Error, data: null};
        }
    }
    

    public async insertUser(_user : Iuser){
        //Exemplo: {id: '7dceb776-107a-4397-ba18-bc5904cf83f8', username: 'claa', email: 'claa@gmail.com', password: '456456', first_name: 'clara', last_name: 'brigada', squad: 'a48ef7ee-b68c-4956-b073-69a946b4e32a', is_admin: true, inactive: false}

        try{
            if(!_user) throw new Error("Verifiquei seus dados");
            
            const res = await this.orm.insert('users', ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'squad', 'is_admin', 'inactive'], _user);

            if (res.err) throw res.err;
            console.log(res.data.rows)
            return {error: null, data: res.data.rows};
        }catch(err){
            return {error: err as Error, 
            data: null};
        }
    };



    public async insertMemberSquad(idSquad: uuid, idUser: uuid){
        //exemplo:  'a48ef7ee-b68c-4956-b073-69a946b4e32a', '7dc35158-75c2-456f-a794-bb09d251ac7e'

        try{
            /* if(!idUser) throw new Error("Insira inserir a id do user");
            if(!idSquad) throw new Error("Insira inserir a id da equipe"); */

            const res = await this.orm.updateMember('users', [idSquad, idUser]);
            console.log(res.data.rows)

            if (res.err) throw res.err;
            return {err: null, data: res.data};
        }catch(err){
            return {err: err as Error, data: null};
        }
    };
    
    public async updateUser(id: uuid, _user: Iuser){

        try{
            const res = await this.orm.update('users', [id], _user);
            console.log(res.data.rows)
            if (res.err) throw res.err;
            return {error: null, data: res.data.rows};
        }catch(err){
            return {error: err as Error, data: null};
        }
    }

    public async deletUser(id: uuid){
        try{
            const res = await this.orm.softDelete(id);
            if (res.err) throw res.err;
            console.log(res.data)

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
            const res = await this.orm.selectAll('squad', ['id', 'name', 'leader']);
            if (res.err) throw res.err;
            console.log(res.data.rows)

            return {error: null, data: res.data};
        }catch(err){
            return {error: err as Error, data: null};
        }
    }


    public async getSpecificSquad(id?: uuid) {
        try{
            if(!id) throw new Error("é necessário um id");
            const res = await this.orm.selectUnic('squad', ['id', 'name', 'leader'], {id: id});
            if (res.err) throw res.err;
            console.log(res.data.rows)

            return {error: null, data: res.data};
        }catch(err){
            return {error: err as Error, data: null};
        }
    }


    public async insertSquad(_squad: Isquad){
        try{
            if(!_squad) throw new Error("verifique seus dados");

            const res = await this.orm.insert('squad', ['id', 'name', 'leader'], _squad);
            if (res.err) throw res.err;
            console.log(res.data.rows)
            return {error: null, data: res.data.rows};

        }catch(err){
            return {error: err as Error, data: null};
        }
    }

    public async updateSquad(id: uuid, _squad : Isquad){
        try{
            const res = await this.orm.update('squad', [id], _squad);

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
            console.log(res.data.rows)

            return {error: null, data: res.data};
        }catch(err){
            return {error: err as Error, data: null};
        }
    }
    
}