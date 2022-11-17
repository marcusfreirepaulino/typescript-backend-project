// Arquivo para acesso direto ao banco de dados
import { Postegres } from "./ORM/index";

const orm = new Postegres;

//Classe para construir os acessos ao banco
export class Database {
    private orm = new Postegres;
    constructor(){}

    public async 

    // metodo para obter usuário do banco de dados a partir de email
    /* 
    async post_softDelete(_squad: any){
        try{
            // seleciona senha de usuáro a partir do id
            const res = await orm.softDelete('5dc35158-75c2-456f-a794-bb09d251ac7e');
            if (res.err) throw res.err;

            console.log(res.data)
            return {error: null, data: res.data};
        }catch(err){
            console.log(err)
            return {error: err, data: null};
        }
    }

    async post_deleteSquad(_squad: any){
        try{
            // seleciona senha de usuáro a partir do id
            const res = await orm.delete('9dc35158-75c2-456f-a794-bb09d251ac7e');
            if (res.err) throw res.err;

            console.log(res.data)
            return {error: null, data: res.data};
        }catch(err){
            console.log(err)
            return {error: err, data: null};
        }
    }*/

    async post_insert(_email: string){
        try{
            // seleciona senha de usuáro a partir do id
            const res = await orm.update('users', ['5dc35158-75c2-456f-a794-bb09d251ac7e'], {username: 'aaaa', email: 'aaae@mail.com'});
            if (res.err) throw res.err;

            console.log(res.data)
            return {error: null, data: res.data};
        }catch(err){
            console.log(err)
            return {error: err, data: null};
        }
    }
}