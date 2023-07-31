import { Form, Radio } from 'antd';
import { useEffect, useState } from 'react';
import { useForm } from 'antd/lib/form/Form';
import { useQuery } from 'react-query';
import { INDIVIDUAL_INPUTS, BUSINESS_INPUTS } from '../../constants';
import {
  fetchData,
  handleChange,
  handleSubmit,
  processData,
} from './functions';
import { Button } from './Button';
import { Inputs } from './Inputs';
import { validationSchema } from '../../utils';
import { ENDPOINTS } from '../../constants';

export const RegisterForm = () => {
  const [customerType, setCustomerType] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const [businessInputs, setBusinessInputs] = useState(BUSINESS_INPUTS);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [submittable, setSubmittable] = useState(false);

  const [form] = useForm();
  const values = Form.useWatch([], form);

  const inputsType =
    customerType === 'business' ? businessInputs : INDIVIDUAL_INPUTS;

  const schema = validationSchema(inputsType);

  const { data: countriesData, isLoading: countriesLoading } = useQuery(
    ENDPOINTS.COUNTRIES,
    () =>
      fetchData({
        endpoint: ENDPOINTS.COUNTRIES,
        selectedCountry,
      })
  );

  const { data: citiesData, isLoading: citiesLoading } = useQuery(
    [ENDPOINTS.CITIES, selectedCountry],
    () =>
      fetchData({
        endpoint: ENDPOINTS.CITIES,
        selectedCountry,
      }),
    { enabled: selectedCountry !== '' }
  );

  useEffect(() => {
    if (!countriesLoading && countriesData) {
      processData({
        data: countriesData,
        endpoint: ENDPOINTS.COUNTRIES,
        businessInputs,
        setBusinessInputs,
      });
    }
  }, [countriesData, countriesLoading]);

  useEffect(() => {
    if (!citiesLoading && citiesData) {
      processData({
        data: citiesData,
        endpoint: ENDPOINTS.CITIES,
        businessInputs,
        setBusinessInputs,
      });
    }
  }, [citiesData, citiesLoading, selectedCountry]);

  useEffect(() => {
    if (customerType !== '') {
      setIsDisable(false);
      form.resetFields();
    }
  }, [customerType]);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values]);

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      colon={false}
      form={form}
      style={{ width: '50%' }}
      onFinish={(values: any) => handleSubmit(values, schema)}
    >
      <Form.Item label="Type" labelCol={{ span: 6 }} labelAlign="left">
        <Radio.Group onChange={(e: any) => handleChange(e, setCustomerType)}>
          <Radio value="individual">Individual</Radio>
          <Radio value="business">Business</Radio>
        </Radio.Group>
      </Form.Item>
      <Inputs
        inputsType={inputsType}
        isDisable={isDisable}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        setCustomerType={setCustomerType}
      />
        <Button name="button" submittable={submittable} form={form} />
    </Form>
  );
};
