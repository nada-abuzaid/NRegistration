import { Form, Input, Radio, Select } from 'antd';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { SubmitButton } from './styled';
import { INDIVIDUAL_INPUTS, BUSINESS_INPUTS } from '../../constants';
import { IFields, IGender } from '../../interfaces';
import { Item } from './Item';
import { Header } from '../Header';
import axios from 'axios';

export const FormDisabledDemo = () => {
  const [customerType, setCustomerType] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [businessInputs, setBusinessInputs] = useState(BUSINESS_INPUTS);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const inputsType =
    customerType === 'business' ? businessInputs : INDIVIDUAL_INPUTS;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/countries`);
        setIsLoading(false);

        const options = data.map((country: any) => ({
          id: country.code,
          value: country.code,
          label: country.name,
        }));

        const updatedInputs = BUSINESS_INPUTS.map((input) =>
          input.name === 'country' ? { ...input, options: options } : input
        );
        console.log(updatedInputs, 'countires');

        setBusinessInputs(updatedInputs);
      } catch {
        setIsLoading(false);
        console.log('Error');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/region/${selectedCountry}`
        );
        setIsLoading(false);

        const options = data.map((region: any, index: any) => ({
          id: index,
          value: region.region,
          label: region.region,
        }));
        console.log(options), 'region';

        const updatedInputs = businessInputs.map((input) =>
          input.name === 'region' ? { ...input, options: options } : input
        );

        setBusinessInputs(updatedInputs);
      } catch {
        setIsLoading(false);
        console.log('Error');
      }
    };
    if (selectedCountry != '') {
      console.log('11111');

      fetchData();
    }
  }, [selectedCountry]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.post(
          `http://localhost:3000/api/city/${selectedCountry}`,
          {
            region: selectedRegion,
          }
        );
        setIsLoading(false);

        const options = data.map((city: any, index: any) => ({
          id: index,
          value: city.city,
          label: city.city,
        }));

        const updatedInputs = businessInputs.map((input) =>
          input.name === 'city' ? { ...input, options: options } : input
        );

        setBusinessInputs(updatedInputs);
      } catch {
        setIsLoading(false);
        console.log('Error');
      }
    };
    if (selectedCountry !== '' && selectedRegion != '') {
      fetchData();
    }
  }, [selectedCountry, selectedRegion]);

  useEffect(() => {
    if (customerType !== '') {
      setIsDisable(false);
    }
  }, [customerType]);

  const handleSelect = (event: any, name: any) => {
    if (name === 'country') {
      setSelectedCountry(event);
    } else if (name === 'region') {
      setSelectedRegion(event);
    } else if (name === 'city') {
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

  if (isLoading) return <div> Loading</div>;
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
