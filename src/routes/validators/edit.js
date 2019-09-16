import Joi from 'joi';

export default {
  body: {
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    available: Joi.boolean().required(),
  },
  params: {
    _id: Joi.required(),
  },
};
