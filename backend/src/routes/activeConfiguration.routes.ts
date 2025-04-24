import {Router} from "express";
import {getActiveConfigurationId, setActiveConfiguration} from "../controllers/activeConfiguration.controller";
import {validateRequest} from "../middleware/validateRequest";
import {activeConfigurationIdSchema} from "../validation/activeConfiguration.schema"

const router = Router();

router.get("/", getActiveConfigurationId);
router.put("/:id", validateRequest(activeConfigurationIdSchema, "params"), setActiveConfiguration);

export default router;