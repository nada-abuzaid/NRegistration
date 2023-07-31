import { message, Space } from 'antd';
import { useEffect } from 'react';

export const Notification = ({
  successMessage,
}: {
  successMessage: string;
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: successMessage,
    });
  };

  useEffect(() => {
    success();
  }, []);

  return (
    <>
      {contextHolder}
      <Space />
    </>
  );
};
