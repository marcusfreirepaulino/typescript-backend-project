// Arquivo para funções gerais de acesso ao PostegreSQL
import { Pool } from "pg";
const poolConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'typescript-backend-project',
    password: 'qazwsxedc',
    port: 5432
};
export class Postegres{
    private pool : Pool;
    constructor(){
        this.pool = new Pool(poolConfig);
    }

    // métodos para conecção com banco de dados
    public async selectAll(table : string, columns: Array<string> = []){
        
        let cc: Array<string> = columns;
        cc.toString();

        const queryText = `SELECT ${cc} FROM ${table}`;
        const response = await this.pool.query(queryText);//resposta da query
        return {err: null, data: response.rows}; // objeto com erro ou resposta
    };

    public async selectUnic(table : string, columns: Array<string> = [], options: object = {} ){
        //columns.length -> retorno [username, email, firts_name, ...] => 'username, email, firts_name, ...'
        //table -> tabela a ser consultada 'users'
        //options -> parametros passados para a consulta { id: 1234, name: 'dfgh' } => 'id = 1234, name = asd'
        //Formar:
        //values = ['username, email, firts_name, ...', 'users', 'id = 1234']
        //$1 => 'username, email, firts_name, ...'
        //$2 => 'users'
        //$3 => 'id=1234, name = wew'

        let cc: Array<string> = columns;
        cc.toString();

        let str = '';
        for (const [p, val] of Object.entries(options)) {
            str += `${p}='${val}'`;
        }
        
        //SELECT ${cc} FROM table WHERE id = '38474'
        const queryText = `SELECT ${cc} FROM ${table} WHERE ${str}`;
        const response = await this.pool.query(queryText);//resposta da query
        return {err: null, data: response.rows}; // objeto com erro ou resposta
    };

    public async insert(table : string, columns: Array<string> = [], options: object = {}){
        
        let cc: Array<string> = columns;
        cc.toString();
        
        let op = '';
        for (const [p, val] of Object.entries(options)) {
            op += `'${val}',`;
        }
        console.log(op);

        const op2 = op.substring(0, op.length - 1);
        console.log(op2);

        const queryText = `INSERT INTO ${table} (${cc}) VALUES (${op2})`;

        console.log(queryText);
        const response = await this.pool.query(queryText);//resposta da query
        return {err: null, data: response}; // objeto com erro ou resposta
    }

    public async updateMember(table : string, columns: Array<string> = []){
        const queryText = `UPDATE ${table} SET squad = $1 WHERE id = $2;`;

        const response = await this.pool.query(queryText, columns);//resposta da query
        return {err: null, data: response}; // objeto com erro ou resposta
    }

    public async update(table : string, options: Array<string> = [], columns: object = {}){
        //Columns -> receber novos dados que se deseja atualizar => { last_name: 'fkffk', username: 'ddhh'}
        let str = '';
        for (const [p, val] of Object.entries(columns)) { // { id: 11223, username: 'teste'} => 'id=11223,username:teste,'
            str += `${p}='${val}',`;
        }
        const op2 = str.substring(0, str.length - 1);
        console.log(op2);

        let cc: Array<string> = options;
        cc.toString();
        console.log(cc);

        //UPDATE [ tabela ]SET [ coluna_1 ] = [ novo_valor_1 ], [ coluna_2 ] = [ novo_valor_2 ] WHERE [ condicao-de-busca ]
        const queryText = `UPDATE ${table} SET ${op2}, updated_at = now() WHERE id = '${cc}'`;
        console.log(queryText);
        const response = await this.pool.query(queryText);//resposta da query
        return {err: null, data: response}; // objeto com erro ou resposta
    }

    public async deleteMemberSquad(table : string, options: Array<string> = [], columns: object = {}){
        //Columns -> receber novos dados que se deseja atualizar => { last_name: 'fkffk', username: 'ddhh'}
        let str = '';
        for (const [p, val] of Object.entries(columns)) { // { id: 11223, username: 'teste'} => 'id=11223,username:teste,'
            str += `${p}=${val},`;
        }
        const op2 = str.substring(0, str.length - 1);
        console.log(op2);

        let cc: Array<string> = options;
        cc.toString();
        console.log(cc);

        //UPDATE [ tabela ]SET [ coluna_1 ] = [ novo_valor_1 ], [ coluna_2 ] = [ novo_valor_2 ] WHERE [ condicao-de-busca ]
        const queryText = `UPDATE ${table} SET ${op2} WHERE id = '${cc}'`;
        console.log(queryText);
        const response = await this.pool.query(queryText);//resposta da query
        return {err: null, data: response}; // objeto com erro ou resposta
    }

    public async delete(id: string){
        
       // DELETE FROM [ tabela ] WHERE [ condicao_de_busca ]; => {'}
       // CRIAR MAIS UMA COLUNA => DELETE: TRUE OU FALSE & deleted_at: now() -> registra a data de delete

        const queryText = `DELETE FROM squad WHERE id = '${id}'`;
        const response = await this.pool.query(queryText);//resposta da query
        return {err: null, data: response}; // objeto com erro ou resposta
    }

    public async softDelete(id: string){
        // DELETE FROM [ tabela ] WHERE [ condicao_de_busca ]; => {'}
        // CRIAR MAIS UMA COLUNA => DELETE: TRUE OU FALSE & deleted_at: now() -> registra a data de delete
 
        //

        const queryText = `UPDATE users SET inactive = true, deleted_at = now() where id = '${id}'`;
        const response = await this.pool.query(queryText);//resposta da query
         return {err: null, data: response}; // objeto com erro ou resposta
    }

}
