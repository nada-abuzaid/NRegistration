/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, DatePicker, Form, Input, Radio, Select } from 'antd';
import { useEffect, useState } from 'react';
// import { useState } from 'react';

export const FormDisabledDemo = () => {
  const [customerType, setCustomerType] = useState('');
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    if (customerType !== '') {
      setIsDisable(false);
    }
  }, [customerType]);

  const handleChange = (event: any) => {
    setCustomerType(event.target.value);
  };
  console.log(isDisable, 'hi');

  return (
    <div className="container">
      <div className="form-header">
        <h1>Welcome there!</h1>
        <p style={{ marginBottom: '18px', fontWeight: 500 }}>
          <span style={{ color: "red", fontWeight: 700  }}>Hint: </span>please select the customer type before complete the registration!
        </p>
      </div>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        colon={false}
        style={{ width: '50%' }}
      >
        <Form.Item label="Type" labelCol={{ span: 6 }} labelAlign="left">
          <Radio.Group onChange={handleChange}>
            <Radio value="individual">Individual</Radio>
            <Radio value="business">Business</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Email"
          wrapperCol={{ span: '100%' }}
          labelCol={{ span: 6 }}
          labelAlign="left"
        >
          <Input
            type="email"
            placeholder="Enter your Email"
            disabled={isDisable}
          />
        </Form.Item>
        <Form.Item
          label="First Name"
          wrapperCol={{ span: '100%' }}
          labelCol={{ span: 6 }}
          labelAlign="left"
        >
          <Input placeholder="Enter your First Name" disabled={isDisable} />
        </Form.Item>
        <Form.Item
          label="Last Name"
          wrapperCol={{ span: '100%' }}
          labelCol={{ span: 6 }}
          labelAlign="left"
        >
          <Input placeholder="Enter your Last Name" disabled={isDisable} />
        </Form.Item>
        <Form.Item
          label="Password"
          wrapperCol={{ span: '100%' }}
          labelCol={{ span: 6 }}
          labelAlign="left"
        >
          <Input
            type="password"
            placeholder="Enter your Password"
            disabled={isDisable}
          />
        </Form.Item>
        <Form.Item
          label="Phone"
          wrapperCol={{ span: '100%' }}
          labelCol={{ span: 6 }}
          labelAlign="left"
        >
          <Input placeholder="Confirm your Phone Number" disabled={isDisable} />
        </Form.Item>
        <Form.Item
          label="Birthdate"
          wrapperCol={{ span: '100%' }}
          labelCol={{ span: 6 }}
          labelAlign="left"
        >
          <DatePicker style={{ width: '100%' }} disabled={isDisable} />
        </Form.Item>
        <Form.Item
          label="Gender"
          wrapperCol={{ span: '100%' }}
          labelCol={{ span: 6 }}
          labelAlign="left"
        >
          <Select placeholder="Select Gender" disabled={isDisable}>
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Address"
          wrapperCol={{ span: '100%' }}
          labelCol={{ span: 6 }}
          labelAlign="left"
        >
          <Input placeholder="Enter your Address" disabled={isDisable} />
        </Form.Item>
        <Button
          style={{
            backgroundColor: '#535bf2',
            color: 'white',
            width: '100%',
            height: '45px',
          }}
          disabled={isDisable}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};
