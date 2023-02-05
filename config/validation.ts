import * as Joi from 'joi';

export const validationSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test'),
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.string().required(),
    PORT: Joi.number().default(5000),
});
