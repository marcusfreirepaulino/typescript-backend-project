// Arquivo para funções gerais de acesso ao PostegreSQL
import { Pool } from "pg";
import { options, uuid, columns, Isquad, Iuser, resp } from '../../interfaces/index'

const poolConfig = {
    user: 'tkjijkie',
    host: 'lucky.db.elephantsql.com',
    database: 'tkjijkie',
    password: 'MPEda0HeLBTWs3Lqhj3mYjY6VFr5SQ2r',
    port: 5432
};
export class Postegres {
    private pool: Pool;
    constructor() {
        this.pool = new Pool(poolConfig);
    }

    // métodos para conecção com banco de dados
    //seleciona deteminados campos de uma table => columns -> ['username', 'email', ...]
    public async selectAll(table: string, columns: columns): Promise<resp<any>> {

        let cc: columns = columns;
        cc.toString();

        const queryText = `SELECT ${cc} FROM ${table} WHERE inactive=false`;
        const response: any = await this.pool.query(queryText);//resposta da query
        return { err: null, data: response.rows }; // objeto com erro ou resposta
    };

    public async selectAllteams(table: string, columns: columns): Promise<resp<any>> {

        let cc: columns = columns;
        cc.toString();

        const queryText = `SELECT ${cc} FROM ${table}`;
        const response: any = await this.pool.query(queryText);//resposta da query
        return { err: null, data: response.rows }; // objeto com erro ou resposta
    };

    public async selectUnic(table: string, columns: columns, options: options): Promise<resp<any>> {

        let cc: Array<string> = columns;
        cc.toString();

        let str = '';
        for (const [p, val] of Object.entries(options)) {
            str += `${p}='${val}'`;
        }

        //SELECT ${cc} FROM table WHERE id = '38474'
        const queryText = `SELECT ${cc} FROM ${table} WHERE ${str}`;
        console.log("42", queryText);
        const response: any = await this.pool.query(queryText);//resposta da query
        console.log("44 query", response.rows);
        return { err: null, data: response.rows }; // objeto com erro ou resposta

    };

    public async insert(table: string, columns: columns, options: options): Promise<resp<any>> {

        let cc: Array<string> = columns;
        cc.toString();

        let op = '';
        for (const [p, val] of Object.entries(options)) {
            op += `'${val}',`;
        }

        const op2 = op.substring(0, op.length - 1);
        console.log("QUERY")
        const queryText = `INSERT INTO ${table} (${cc}) VALUES (${op2})`;

        console.log("querytext", queryText);

        const response: any = await this.pool.query(queryText);//resposta da query
        console.log("response", response);
        return { err: null, data: response }; // objeto com erro ou resposta
    }

    public async updateMember(table: string, columns: columns): Promise<resp<any>> {
        const queryText = `UPDATE ${table} SET squad = $1 WHERE id = $2;`;

        const response: any = await this.pool.query(queryText, columns);//resposta da query
        return { err: null, data: response }; // objeto com erro ou resposta
    }

    public async update(table: string, options: columns, columns: options): Promise<resp<any>> {
        //Columns -> receber novos dados que se deseja atualizar => { last_name: 'fkffk', username: 'ddhh'}
        let str = '';
        for (const [p, val] of Object.entries(columns)) { // { id: 11223, username: 'teste'} => 'id=11223,username:teste,'
            str += `${p}='${val}',`;
        }
        const op2 = str.substring(0, str.length - 1);

        let cc: Array<string> = options;
        cc.toString();

        const queryText = `UPDATE ${table} SET ${op2}, updated_at=now() WHERE id = '${cc}'`;
        console.log(queryText)

        const response: any = await this.pool.query(queryText);//resposta da query
        return { err: null, data: response }; // objeto com erro ou resposta
    }

    public async updateSquadOnly(table: string, options: columns, columns: options): Promise<resp<any>> {
        //Columns -> receber novos dados que se deseja atualizar => { last_name: 'fkffk', username: 'ddhh'}
        let str = '';
        for (const [p, val] of Object.entries(columns)) { // { id: 11223, username: 'teste'} => 'id=11223,username:teste,'
            str += `${p}='${val}',`;
        }
        const op2 = str.substring(0, str.length - 1);

        let cc: Array<string> = options;
        cc.toString();

        const queryText = `UPDATE ${table} SET ${op2} WHERE id = '${cc}'`;
        console.log(queryText)

        const response: any = await this.pool.query(queryText);//resposta da query
        return { err: null, data: response }; // objeto com erro ou resposta
    }

    public async deleteMemberSquad(_id: uuid): Promise<resp<any>> {
        const queryText = `UPDATE 'users' SET squad = NULL, updated_at = now() WHERE id='${_id}'`;
        console.log(queryText);
        const response: any = await this.pool.query(queryText);//resposta da query
        return { err: null, data: response }; // objeto com erro ou resposta
    }

    public async delete(id: string): Promise<resp<any>> {
        // DELETE FROM [ tabela ] WHERE [ condicao_de_busca ]; => {'}
        // CRIAR MAIS UMA COLUNA => DELETE: TRUE OU FALSE & deleted_at: now() -> registra a data de delete

        const queryText = `DELETE FROM squad WHERE id = '${id}'`;
        const response: any = await this.pool.query(queryText);//resposta da query
        return { err: null, data: response }; // objeto com erro ou resposta
    }

    public async softDelete(_id: string): Promise<resp<any>> {
        const queryText = `UPDATE "users" SET inactive = 'true' WHERE id='${_id}'`;
        console.log(queryText);
        const response: any = await this.pool.query(queryText);//resposta da query
        return { err: null, data: response }; // objeto com erro ou resposta
    }
}