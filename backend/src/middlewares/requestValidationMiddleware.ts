import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

/**
 * Generic DTO validation middleware.
 * @param dtoClass DTO class reference.
 */
export const validateDto = (dtoClass: any) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const dtoInstance = plainToInstance(dtoClass, req.body);

        const errors = await validate(dtoInstance);

        if (errors.length > 0) {
            res.status(400).json({
                message: "Validation failed",
                errors: errors.map(err => ({
                    property: err.property,
                    constraints: err.constraints
                }))
            });
        }

        next();
    };
};


export const checkIdParam = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ message: "id param is required" });
        return Promise.resolve();
    }

    next();
    return Promise.resolve();
};

/**
 * Tüm Create ve Update rotalarında kullanılan ortak bir middleware
 */
export const validateAndCheckParams = (dtoClass: any) => {
    return [
        validateDto(dtoClass),
        checkIdParam,
    ];
};