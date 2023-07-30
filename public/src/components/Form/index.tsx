import { Form, Input, Radio, Select } from 'antd';
import { useEffect, useState } from 'react';
import { INDIVIDUAL_INPUTS, BUSINESS_INPUTS } from '../../constants';
import { IFields, IGender } from '../../interfaces';
import { Item } from './Item';
import { useQuery } from 'react-query';
import { fetchData, handleChange, handleSelect, handleSubmit, processData } from './functions';
import { Button } from './Button';

export const RegisterForm = () => {
  const [customerType, setCustomerType] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const [businessInputs, setBusinessInputs] = useState(BUSINESS_INPUTS);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [form] = Form.useForm();

  const inputsType =
    customerType === 'business' ? businessInputs : INDIVIDUAL_INPUTS;

  const { data: countriesData, isLoading: countriesLoading } = useQuery(
    'countries',
    () =>
      fetchData({
        endpoint: 'countries',
        selectedCountry,
      })
  );

  const { data: citiesData, isLoading: citiesLoading } = useQuery(
    ['cities', selectedCountry],
    () =>
      fetchData({
        endpoint: 'cities',
        selectedCountry,
      }),
    { enabled: selectedCountry !== '' }
  );

  useEffect(() => {
    if (!countriesLoading && countriesData) {
      processData({
        data: countriesData,
        endpoint: 'countries',
        businessInputs,
        setBusinessInputs,
      });
    }
  }, [countriesData, countriesLoading]);

  useEffect(() => {
    if (!citiesLoading && citiesData) {
      processData({
        data: citiesData,
        endpoint: 'cities',
        businessInputs,
        setBusinessInputs,
      });
    }
  }, [citiesData, citiesLoading, selectedCountry]);

  useEffect(() => {
    if (customerType !== '') {
      setIsDisable(false);
    }
  }, [customerType]);

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      colon={false}
      style={{ width: '50%' }}
      form={form}
      onFinish={() => handleSubmit(form)}
    >
      <Form.Item label="Type" labelCol={{ span: 6 }} labelAlign="left">
        <Radio.Group onChange={(e: any) => handleChange(e, setCustomerType)}>
          <Radio value="individual">Individual</Radio>
          <Radio value="business">Business</Radio>
        </Radio.Group>
      </Form.Item>
      {inputsType.map(
        ({ id, label, type, name, placeholder, options = [] }: IFields) => (
          <Item name={name} label={label} id={id} key={id}>
            {type === 'list' ? (
              <Select
                placeholder={placeholder}
                disabled={isDisable}
                onChange={(e) => handleSelect(e, name, setSelectedCountry)}
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
                onChange={(e: any) => handleChange(e, setCustomerType)}
              />
            )}
          </Item>
        )
      )}
      <Button />
    </Form>
  );
};
