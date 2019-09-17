import Joi from 'joi';

export default {
  body: {
    title: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    available: Joi.boolean(),
    sku: Joi.string(),
  },
  params: {
    id: Joi.required(),
  },
};
