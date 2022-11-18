// nivel para criação de rotas e direcionamento do tratamento
import * as express from 'express';
//import { getUserLogin, getUserMe, getUsers, getUserById, getTeams, getTeamById } from '../controller/users';
import { getUserLogin } from '../controller/users';
const router = express.Router();

// router.post('/login', login);

//criar o jwtUser -> libera acesso apenas para o user -> 
// jwtLider -> libera acesso apenas para o líder -> 
// jwtAdmin -> libera acesso apenas para o Admin ->
// jwtLiderAdmin -> libera acesso apenas para o Admin e o lider
// jwt

// router.get("/users/", JWT.jwtUser , getUsers);

router.post("/login",  getUserLogin);

// router.get("/users/", getUsers);
// router.get("/users/me", getUserMe);
// router.get("/users/:user_id", getUserById);
//router.get("/teams/", getTeams);
//router.get("/teams/:team_id", getTeamById);

router.post("/users/");
router.post("/team/");

router.patch("/users/:user_id");
router.patch("/teams/:team_id");
router.post("/team/:team_id/member/:user_id");

router.delete("/teams/:team_id/members/:user_id");
router.delete("/users/:user_id");
router.delete("/teams/:team_id");

// router.get("/exemplo", getExemple);

export default router;

