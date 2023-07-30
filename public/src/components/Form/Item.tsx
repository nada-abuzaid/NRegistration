import { Form } from 'antd';

export const Item = ({ id, label, name, error, children }: any) => (
  <Form.Item
    key={id}
    label={label}
    name={name}
    labelAlign="left"
    labelCol={{ span: 6 }}
    wrapperCol={{ span: '100%' }}
  >
    {children}
  </Form.Item>
);
