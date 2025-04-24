import {Router} from "express";
import {getActiveConfiguration} from "../controllers/activeConfiguration.controller";

const router = Router();

router.get("/", getActiveConfiguration);

export default router;