import Joi from "joi-browser";

const cardSchema = {
  bizName: Joi.string().min(2).max(255).required(),
  bizDescription: Joi.string().min(2).max(1024).required(),
  bizAddress: Joi.string().min(2).max(500).required(),
  bizPhone: Joi.string()
    .min(2)
    .max(15)
    .required()
    .regex(/^0[2-9][-]?\d{7,9}$|^05[0-9][-]?\d{7,9}$|^07[7,3][-]?\d{7,9}$/),
  bizImage: Joi.string().uri().min(20),
};

export default cardSchema;
