import * as Yup from 'yup';

export const validationSchema = (inputs: any) => {
  let schema = {} as any;

  inputs.forEach(({ name, error }: any) => {
    switch (name) {
      case 'email':
        schema[name] = Yup.string().email('Invalid email').required(error);
        break;
      case 'password':
        schema[name] = Yup.string()
          .required(error)
          .min(8, 'Password must be at least 8 characters long')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            'Password must contain at least 1 uppercase letter, 1 number, and 1 special character'
          );
        break;
      case 'firstName':
      case 'lastName':
      case 'company':
      case 'address':
      case 'countries':
      case 'gender':
      case 'cities':
        schema[name] = Yup.string().required(error);
        break;
      case 'phone':
        schema[name] = Yup.string().required(error);
        break;
      case 'birthdate':
        schema[name] = Yup.date()
          .required(error)
          .max(
            new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000),
            'Must be at least 18 years old'
          );
        break;
      default:
        break;
    }
  });

  return Yup.object().shape(schema);
};
