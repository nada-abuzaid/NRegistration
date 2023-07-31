import Joi from 'joi';

export const generateValidationSchema = (data: any) => {
    const schema: any = {};
  
    Object.keys(data).forEach((key) => {
      switch (key) {
        case 'email':
          schema[key] = Joi.string()
            .email()
            .required()
            .messages({
              'string.email': `Invalid ${key}`,
              'any.required': `${key} is required`,
            });
          break;
        case 'password':
          schema[key] = Joi.string()
            .min(8)
            .pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
            )
            .required()
            .messages({
              'string.min': `Password must be at least 8 characters long`,
              'string.pattern.base': `Password must contain at least 1 uppercase letter, 1 number, and 1 special character`,
              'any.required': `Password is required`,
            });
          break;
        case 'firstName':
        case 'lastName':
        case 'company':
        case 'address':
        case 'countries':
        case 'gender':
        case 'cities':
          schema[key] = Joi.string()
            .required()
            .messages({
              'any.required': `${key} is required`,
            });
          break;
        case 'phone':
          schema[key] = Joi.string().required().messages({
            'any.required': `Phone is required`,
          });
          break;
        case 'birthdate':
          schema[key] = Joi.date()
            // .max('now')
            // .subtract(18, 'years')
            .required()
            .messages({
              'date.max': `Must be at least 18 years old`,
              'any.required': `Birthdate is required`,
            });
          break;
        default:
          break;
      }
    });
  
    return Joi.object(schema);
  };
  