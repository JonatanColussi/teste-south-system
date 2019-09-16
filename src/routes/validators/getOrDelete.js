import Joi from 'joi';

export default {
  params: {
    id: Joi.required(),
  },
};
