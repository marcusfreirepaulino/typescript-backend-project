// nivel para aplicação das regras de negócios
import * as validator from "../validator";
import { Database } from "../repositories";

export const registerUser = async (data: validator.User) =>{
    try{
        new validator.EmailValidator(data.email);
        new validator.NameValidator(data.username);
        new validator.PasswordValidator(data.password);
        new validator.NameValidator(data.first_name);
        new validator.NameValidator(data.last_name);

        const id = 'awoooga';
        data.id = id;

        const db = new Database();
        const response = await db.post_user(data.email);
        
        if(!response.error){
            throw {
                status: 500
            }
        }
        
    }
    catch(err: any){
        return {err: err}
    }

}

export const registerTeam = async (data: validator.Team) =>{
    try{
        new validator.NameValidator(data.name);
        new validator.NameValidator(data.leader);

        const id = 'awoooga';
        data.id = id;
    }
    catch(err : any){
        return {err: err};
    }


}
