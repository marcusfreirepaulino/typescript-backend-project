// nivel para criação de rotas e direcionamento do tratamento
import { create } from 'domain';
import * as express from 'express';
import { getUserLogin, getUserMe, getUsers, getUserById, getTeams, getTeamById, createUser, createTeam, patchUser, patchTeam, patchMember, deleteMemberSquad, deleteUser, deleteSquad } from '../controller/users';
import { authAdmin, authAdminLider, authLog, authUser } from '../middleware/index';

const router = express.Router();
router.use(express.json());

router.post("/login", getUserLogin);
router.get("/users/me", authLog, getUserMe);
router.get("/users/", authAdmin, getUsers);
router.get("/users/:user_id", authAdminLider, getUserById);
router.get("/teams/", authAdmin, getTeams);
router.get("/teams/:team_id", authLog, getTeamById);
router.post("/users/", createUser);
router.post("/team/", authAdmin, createTeam);
router.patch("/users/:user_id", authUser, patchUser);
router.patch("/team/:team_id", authAdminLider, patchTeam);
router.patch("/team/:team_id/member/:user_id", authAdminLider, patchMember);
router.delete("/team/:team_id/member/:user_id", authAdminLider, deleteMemberSquad);
router.delete("/users/:user_id", authAdmin, deleteUser);

router.delete("/team/:team_id", authAdmin, deleteSquad);

export default router;