import { Form } from 'antd';
import { validationSchema } from '../../utils';

export const Item = ({ id, label, name, inputsType, children }: any) => {
  const schema = validationSchema(inputsType);
  const yupSync = {
    async validator({ field }: any, value: any) {
      await schema.validateSyncAt(field, { [field]: value });
    },
  };
  return (
    <Form.Item
      key={id}
      label={label}
      name={name}
      labelAlign="left"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: '100%' }}
      validateTrigger="onChange"
      rules={[yupSync]}
    >
      {children}
    </Form.Item>
  );
};
