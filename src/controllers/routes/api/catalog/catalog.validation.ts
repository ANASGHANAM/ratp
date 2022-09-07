import Joi from "joi";

export const uploadCatalogQuery = Joi.object().keys({
  platform: Joi.string().required().description("Platform code"),
});
export const importCatalogQuery = Joi.object()
  .keys({
    from: Joi.number()
      .optional()
      .min(0)
      .default(0)
      .description(
        "from number, shall be greater or equal than 0, default value is 0"
      ),
    size: Joi.number()
      .optional()
      .min(1)
      .default(10)
      .description("size number, shall be positive, default value is 10"),
    line: Joi.string().required().description("Metro line code"),
  })
  .label("Get public WC catalog");
