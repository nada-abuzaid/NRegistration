import * as yup from 'yup';

export const schema = yup.object().shape({
  customerType: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});
