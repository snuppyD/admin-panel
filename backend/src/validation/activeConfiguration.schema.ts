import Joi from "joi";

export const activeConfigurationIdSchema = Joi.object({
    id: Joi.string().length(24).hex().required().messages({
        "any.required": "ID is required",
        "string.length": "ID must be a 24-character hex string",
        "string.hex": "ID must be a valid hex string",
    }),
});