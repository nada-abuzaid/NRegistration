import { ENDPOINTS } from '../../constants';
import { axiosInstance } from '../../utils';

export const processData = ({
  data,
  endpoint,
  businessInputs,
  setBusinessInputs,
}: any) => {
  const options = data.map((item: any) => ({
    id: endpoint === ENDPOINTS.COUNTRIES ? item.id : item.state_name,
    value: endpoint === ENDPOINTS.COUNTRIES ? item.name : item.state_name,
    label: endpoint === ENDPOINTS.COUNTRIES ? item.name : item.state_name,
  }));
  const updatedInputs = businessInputs.map((input: any) =>
    input.name === endpoint ? { ...input, options: options } : input
  );

  setBusinessInputs(updatedInputs);
};

export const fetchData = async ({ endpoint, selectedCountry }: any) => {
  endpoint =
    endpoint === ENDPOINTS.COUNTRIES
      ? `/${endpoint}`
      : `/${endpoint}/${selectedCountry}`;
  try {
    const data = await axiosInstance.get(`${endpoint}`);

    return data;
  } catch (error) {
    return error;
  }
};

export const handleSubmit = async (values: any, schema: any, navigate: any) => {
  try {
    schema.validateSync(values, { abortEarly: false });
    const data = await axiosInstance.post(ENDPOINTS.USER, {
      user: values,
    }) as any;
    navigate('/', { state: { message: data.message } });
  } catch (error: any) {
    console.log('Customer validation failed:', error.errors);
  }
};

export const handleSelect = (
  event: any,
  name: any,
  setSelectedCountry: any
) => {
  if (name === ENDPOINTS.COUNTRIES) {
    setSelectedCountry(event);
  }
};

export const handleChange = (event: any, setCustomerType: any) => {
  if (event.target.type === 'radio') {
    setCustomerType(event.target.value);
  }
};
