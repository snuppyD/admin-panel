import {Router} from "express";
import {validateRequest} from "../middleware/validateRequest";
import {
    createConfiguration,
    getConfigurations,
    updateConfiguration,
    deleteConfiguration
} from "../controllers/configuration.controller";
import {createConfigurationSchema, updateConfigurationSchema} from "../validation/configuration.schema";

const router = Router();

router.get("/", getConfigurations);
router.post("/", validateRequest(createConfigurationSchema), createConfiguration);
router.put("/:id", validateRequest(updateConfigurationSchema), updateConfiguration);
router.delete("/:id", deleteConfiguration);

export default router;