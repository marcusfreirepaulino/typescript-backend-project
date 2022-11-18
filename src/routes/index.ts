// nivel para criação de rotas e direcionamento do tratamento
import * as express from 'express';


import { getUserLogin, getUserMe, getUsers, getUserById, getTeams, getTeamById, createUser} from '../controller/users';

const router = express.Router();
router.use(express.json());
// router.post('/login', login);
import { authAdmin } from '../middleware/index'
//criar o jwtUser -> libera acesso apenas para o user -> 
// jwtLider -> libera acesso apenas para o líder -> 
// jwtAdmin -> libera acesso apenas para o Admin ->
// jwtLiderAdmin -> libera acesso apenas para o Admin e o lider
// jwt


router.post("/login",  getUserLogin);

router.post("/login",  getUserLogin);
router.get("/users/", authAdmin , getUsers);
router.patch("/users/:user_id", );
// router.get("/users/", getUsers);
// router.get("/users/me", getUserMe);
// router.get("/users/:user_id", getUserById);
//router.get("/teams/", getTeams);
//router.get("/teams/:team_id", getTeamById);


// router.post("/users/", authAdmin, list);

router.post("/login",  getUserLogin);

router.get("/users/", getUsers);
// router.get("/users/me", getUserMe);
// router.get("/users/:user_id", getUserById);
//router.get("/teams/", getTeams);
//router.get("/teams/:team_id", getTeamById);

router.post("/users/", createUser);

router.post("/team/");

router.patch("/users/:user_id");
router.patch("/teams/:team_id");
router.post("/team/:team_id/member/:user_id");

router.delete("/teams/:team_id/members/:user_id");
router.delete("/users/:user_id");
router.delete("/teams/:team_id");

// router.get("/exemplo", getExemple);

export default router;

