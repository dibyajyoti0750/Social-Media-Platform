import Joi from "joi";

export const postSchema = Joi.object({
  content: Joi.string().required().messages({
    "string.empty": "Content is required",
    "any.required": "Content is required",
  }),
  image: Joi.string().uri().optional(),
});

export const updatePostSchema = Joi.object({
  content: Joi.string().messages({
    "string.empty": "Caption is required",
    "any.required": "Caption is required",
  }),
  image: Joi.string().allow(""),
})
  .unknown(false)
  .messages({
    "object.unknown": "Invalid field(s) provided",
  });
