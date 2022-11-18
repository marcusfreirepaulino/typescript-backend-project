// nivel para criação de rotas e direcionamento do tratamento
import { create } from 'domain';
import * as express from 'express';

import { getUserLogin, getUserMe, getUsers, getUserById, getTeams, getTeamById, createUser, createTeam, patchUser, patchTeam, patchMember, deleteMemberSquad, deleteUser, deleteSquad } from '../controller/users';

const router = express.Router();
router.use(express.json());
// router.post('/login', login);
import { authAdmin } from '../middleware/index'
//criar o jwtUser -> libera acesso apenas para o user -> 
// jwtLider -> libera acesso apenas para o líder -> 
// jwtAdmin -> libera acesso apenas para o Admin ->
// jwtLiderAdmin -> libera acesso apenas para o Admin e o lider
// jwt


router.post("/login", getUserLogin);


router.get("/users/", authAdmin, getUsers);
router.get("/users/me", getUserMe);
router.get("/users/:user_id", getUserById);
router.get("/teams/", getTeams);
router.get("/teams/:team_id", getTeamById);

router.post("/users/", createUser);
router.post("/team/", createTeam);

router.patch("/users/:user_id", patchUser);
router.patch("/teams/:team_id", patchTeam);
router.patch("/team/:team_id/member/:user_id", patchMember);

router.delete("/teams/:team_id/members/:user_id", deleteMemberSquad);
router.delete("/users/:user_id", deleteUser);
router.delete("/teams/:team_id", deleteSquad);

export default router;

