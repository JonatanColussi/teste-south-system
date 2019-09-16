import Joi from 'joi';

export default {
  params: {
    _id: Joi.required(),
  },
};
