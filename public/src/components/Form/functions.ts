import axiosInstance from '../../utils/api';
import { schema } from '../../utils/validation';

export const processData = ({
  data,
  endpoint,
  businessInputs,
  setBusinessInputs,
}: any) => {
  const options = data.map((item: any) => ({
    id: endpoint === 'countries' ? item.id : item.state_name,
    value: endpoint === 'countries' ? item.name : item.state_name,
    label: endpoint === 'countries' ? item.name : item.state_name,
  }));
  const updatedInputs = businessInputs.map((input: any) =>
    input.name === endpoint ? { ...input, options: options } : input
  );

  setBusinessInputs(updatedInputs);
};

export const fetchData = async ({ endpoint, selectedCountry }: any) => {
  endpoint =
    endpoint === 'countries'
      ? `/${endpoint}`
      : `/${endpoint}/${selectedCountry}`;
  try {
    const data = await axiosInstance.get(`${endpoint}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const handleSubmit = async (form: any) => {
  try {
    const values = await form.validateFields();
    await schema.validate(values, { abortEarly: false });
    console.log('Form submitted');
  } catch (validationErrors: any) {
    const errors: Record<string, string> = {};
    validationErrors.inner.forEach(({ name, errors: [errorMessage] }: any) => {
      errors[name] = errorMessage;
    });
  }
};


export const handleSelect = (event: any, name: any, setSelectedCountry: any) => {
  if (name === 'countries') {
    setSelectedCountry(event);
  } else if (name === 'cities') {
    console.log(event);
  }
};

export const handleChange = (event: any, setCustomerType: any) => {
  if (event.target.type === 'radio') {
    setCustomerType(event.target.value);
  } else {
    console.log('ok');
  }
};
