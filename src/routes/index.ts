// nivel para criação de rotas e direcionamento do tratamento
import * as express from 'express';

const router = express.Router();

router.get("/users/");
router.get("/users/me");
router.get("/users/:user_id");
router.get("/teams/");
router.get("/teams/:team_id");

router.post("/users/");
router.post("/team/");
router.post("team/:team_id/member/:user_id");

router.patch("/users/:user_id");
router.patch("/teams/:team_id");

router.delete("/teams/:team_id/members/:user_id");
router.delete("/users/:user_id");
router.delete("/teams/:team_id");

export default router;

