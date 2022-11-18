// nivel para criação de rotas e direcionamento do tratamento
import * as express from 'express';
import { getUserLogin, getUserMe, getUsers, getUserById, getTeams, getTeamById, createUser, createTeam } from '../controller/users';

const router = express.Router();
router.use(express.json());
// router.post('/login', login);
import { authAdmin, authAdminLider, authLog } from '../middleware/index'

router.post("/login", getUserLogin);
router.get("/users/me", authLog, getUserMe);
router.get("/users/", authAdmin, getUsers);
router.get("/users/:user_id", authAdminLider, getUserById);
router.get("/teams/", authAdmin, getTeams);
router.get("/teams/:team_id", authLog, getTeamById);
router.post("/users/", createUser);
router.post("/team/", authAdmin, createTeam);

router.patch("/users/:user_id");
router.patch("/teams/:team_id");
router.post("/team/:team_id/member/:user_id");
router.delete("/teams/:team_id/members/:user_id");
router.delete("/users/:user_id");
router.delete("/teams/:team_id");

export default router;

