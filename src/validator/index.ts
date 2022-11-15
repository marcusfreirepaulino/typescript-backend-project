// nivel para a validação de dados, como email
class RegexValidator {
    constructor(data:any) { }
    get regex() {
        return new RegExp("");
    }
}

class EmailValidator {
    constructor(data:any) {
        const regexCode = /^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim;
        const validator = regexCode.test(data);
        if (!validator) {
            throw new Error("O formato está errado");
        }
    }
    get regex() {
        return new RegExp("/^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim");
    }
}

class PasswordValidator {
    constructor(data:any) {
        const regexCode = /^\w{1,}$/;
        const validator = regexCode.test(data);
        if (!validator) {
            throw new Error("O formato está errado");
        }
    }
    get regex() {
        return new RegExp("/^\w{1,}$/");
    }
}

class NameValidator {
    constructor(data:any) {
        const regexCode = /^([a-z]{1,})([ ]{1}[a-z]{1,}){0,}$/gim;
        const validator = regexCode.test(data);
        if (!validator) {
            throw new Error("O formato está errado");
        }
    }
    get regex() {
        return new RegExp("/^([a-z]{1,})([ ]{1}[a-z]{1,}){0,}$/gim");
    }
}

export {EmailValidator, PasswordValidator, NameValidator};