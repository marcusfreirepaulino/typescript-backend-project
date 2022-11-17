// nivel para criação de rotas e direcionamento do tratamento
import * as express from 'express';
const { getUserMe, getUsers, getUserById, getTeams, getTeamById } = require ('../controller/users.ts');

const router = express.Router();

router.get("/users/", getUsers);
router.get("/users/me", getUserMe);
router.get("/users/:user_id", getUserById);
router.get("/teams/", getTeams);
router.get("/teams/:team_id", getTeamById);

router.post("/users/");
router.post("/team/");
router.post("team/:team_id/member/:user_id");

router.patch("/users/:user_id");
router.patch("/teams/:team_id");

router.delete("/teams/:team_id/members/:user_id");
router.delete("/users/:user_id");
router.delete("/teams/:team_id");

export default router;

