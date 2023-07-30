import { Form, Input, Radio, Select } from 'antd';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { SubmitButton } from './styled';
import { INDIVIDUAL_INPUTS, BUSINESS_INPUTS } from '../../constants';
import { IFields, IGender } from '../../interfaces';
import { Item } from './Item';
import { Header } from '../Header';
import axiosInstance from '../../utils/api';

export const FormDisabledDemo = () => {
  const [customerType, setCustomerType] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [businessInputs, setBusinessInputs] = useState(BUSINESS_INPUTS);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [form] = Form.useForm();

  const inputsType =
    customerType === 'business' ? businessInputs : INDIVIDUAL_INPUTS;

  const fetchData = async (endpoint: string) => {
    endpoint =
      endpoint === 'countries'
        ? `/${endpoint}`
        : `/${endpoint}/${selectedCountry}`;
    try {
      const data = await axiosInstance.get(`${endpoint}`);
      return data;
    } catch (error) {
      console.log('Error fetching data:', error);
      return [];
    }
  };

  const processData = async (endpoint: any) => {
    try {
      const data = (await fetchData(endpoint)) as any;

      const options = data.map((item: any) => ({
        id: endpoint === 'countries' ? item.id : item.state_name,
        value: endpoint === 'countries' ? item.name : item.state_name,
        label: endpoint === 'countries' ? item.name : item.state_name,
      }));

      const updatedInputs = businessInputs.map((input) =>
        input.name === endpoint ? { ...input, options: options } : input
      );

      setBusinessInputs(updatedInputs);

    } catch (error) {
      console.error('Error processing data:', error);
      return [];
    }
  };

  useEffect(() => {
    processData('countries');
  }, []);

  useEffect(() => {
    if (selectedCountry !== '') {
      processData('cities');
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (customerType !== '') {
      setIsDisable(false);
    }
  }, [customerType]);

  const handleSelect = (event: any, name: any) => {
    if (name === 'countries') {
      setSelectedCountry(event);
    } else if (name === 'cities') {
      console.log(event);
    }
  };

  const handleChange = (event: any) => {
    if (event.target.type === 'radio') {
      setCustomerType(event.target.value);
    } else {
      console.log('ok');
    }
  };

  const schema = yup.object().shape({
    customerType: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  });

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await schema.validate(values, { abortEarly: false });
      console.log('Form submitted');
    } catch (validationErrors: any) {
      const errors: Record<string, string> = {};
      validationErrors.inner.forEach(
        ({ name, errors: [errorMessage] }: any) => {
          errors[name] = errorMessage;
        }
      );
      setFormErrors(errors);
    }
  };

  return (
    <div className="container">
      <Header />
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        colon={false}
        style={{ width: '50%' }}
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item label="Type" labelCol={{ span: 6 }} labelAlign="left">
          <Radio.Group onChange={handleChange}>
            <Radio value="individual">Individual</Radio>
            <Radio value="business">Business</Radio>
          </Radio.Group>
        </Form.Item>
        {inputsType.map(
          ({
            id,
            label,
            type,
            name,
            placeholder,
            options = [],
            error,
          }: IFields) => (
            <Item error={error} name={name} label={label} id={id} key={id}>
              {type === 'list' ? (
                <Select
                  placeholder={placeholder}
                  disabled={isDisable}
                  onChange={(e) => handleSelect(e, name)}
                >
                  {options.map(({ id, label, value }: IGender) => (
                    <Select.Option key={id} value={value}>
                      {label}
                    </Select.Option>
                  ))}
                </Select>
              ) : (
                <Input
                  type={type}
                  placeholder={placeholder}
                  disabled={isDisable}
                  onChange={handleChange}
                />
              )}
            </Item>
          )
        )}
        <SubmitButton
          disabled={Object.keys(formErrors).length > 0}
          htmlType="submit"
        >
          Submit
        </SubmitButton>
      </Form>
    </div>
  );
};
