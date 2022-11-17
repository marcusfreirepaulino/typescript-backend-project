// Arquivo para acesso direto ao banco de dados
import { Postegres } from "./ORM/index";

const orm = new Postegres;

//Classe para construir os acessos ao banco
export class Database {
    private orm = new Postegres;
    constructor(){}

    // metodo para obter usuário do banco de dados a partir de email
    /* async get_all(_email: string){
        try{
            // seleciona senha de usuáro a partir de email
            const res = await orm.selectAll('users', ["username", "email"]);
            if (res.err) throw res.err;

            console.log(res.data)
            return {error: null, data: res.data};
        }catch(err){
            console.log(err)
            return {error: err, data: null};
        }
    } 
    
    async get_unic(_email: string){
        try{
            // seleciona senha de usuáro a partir do id
            const res = await orm.selectUnic('users', ["username", "email", "password"], {id: 'a47ef7ee-b68c-4956-b073-69a946b4e32a'});
            if (res.err) throw res.err;

            console.log(res.data)
            return {error: null, data: res.data};
        }catch(err){
            console.log(err)
            return {error: err, data: null};
        }
    }*/

     async post_user(_email: string | undefined){
        try{
            // seleciona senha de usuáro a partir do id
            const res = await orm.insert('users', ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'is_admin', 'squad'], {id: '5dc35158-75c2-456f-a794-bb09d251ac7e', username: 'usuariotest', email: 'este@mail.com', password: '123', first_name: 'test', last_name: 'testes', is_admin: 'true', squad: 'a47ef7ee-b68c-4956-b073-69a946b4e32a'});
            if (res.err) throw res.err;

            console.log(res.data)
            return {error: null, data: res.data};
        }catch(err){
            console.log(err)
            return {error: err, data: null};
        }
    } 

    async post_memberSquad(_squad: any){
        try{
            // seleciona senha de usuáro a partir do id
            const res = await orm.insertMember('users', ['a48ef7ee-b68c-4956-b073-69a946b4e32a', 'e649f6ee-eb52-4647-96dd-4ebccfff5fcd']);
            if (res.err) throw res.err;

            console.log(res.data)
            return {error: null, data: res.data};
        }catch(err){
            console.log(err)
            return {error: err, data: null};
        }
    }

}

