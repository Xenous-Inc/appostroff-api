import * as Joi from 'joi';

export const validationSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test'),
    PORT: Joi.number().default(5000),
    DB_HOST: Joi.string(),
    DB_PORT: Joi.number().default(5432),
    DB_USER: Joi.string(),
    DB_PASS: Joi.string(),
    DB_DIALECT: Joi.string(),
    DB_NAME_TEST: Joi.string(),
    DB_NAME_DEVELOPMENT: Joi.string(),
    DB_NAME_PRODUCTION: Joi.string(),
    AT_SECRET: Joi.string(),
    AT_EXPIRATION: Joi.string(),
    RT_SECRET: Joi.string(),
    RT_EXPIRATION: Joi.string(),
    SALT: Joi.number().default(12),
});
