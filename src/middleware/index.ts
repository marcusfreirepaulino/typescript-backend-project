// criar a classe JWT com métodos de verificação:

// const fs = require('fs');
// const jwt = require('./jwt');

// const authMiddleware = async (req, res, next) => {
//     const [, token] = req.headers.authorization.split(" ");

//     try {
//         const payload = jwt.verify(token);
//         req.auth = {
//             id: payload.id,
//         };
//         console.log(payload);

//         if (payload.type === "user") {   ==> 
//             next();
//         }
//         else {
//             return res.send("Acesso negado!");
//         }

//     } catch (error) {
//         res.status(401).send('Falha na autenticação do usuário');
//     }
// };