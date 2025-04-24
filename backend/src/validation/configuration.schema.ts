import Joi from "joi";

export const configurationItemSchema = Joi.object({
    _id: Joi.string().hex().length(24).optional(),
    name: Joi.string().required(),
    type: Joi.string().valid("slideshow", "2_row_horizontal", "1_row_horizontal", "single_card_description").required(),
    sortCardsBy: Joi.string().valid("views", "created", "last_watched").required(),
    cards: Joi.array().items(Joi.string().hex().length(24)).optional(),
});

export const createConfigurationSchema = Joi.object({
    name: Joi.string().required(),
    configuration: Joi.array().items(configurationItemSchema).required(),
});

export const updateConfigurationSchema = Joi.object({
    name: Joi.string(),
    configuration: Joi.array().items(configurationItemSchema)
});