import {Request, Response, NextFunction, RequestHandler} from "express";
import {ObjectSchema} from "joi";

export const validateRequest = (
    schema: ObjectSchema,
    property: "body" | "params" | "query" = "body"
): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const {error} = schema.validate(req[property], {abortEarly: false});
        if (error) {
            res.status(400).json({
                message: "Validation error",
                details: error.details.map((d) => d.message),
            });
            return;
        }
        next();
    };
};