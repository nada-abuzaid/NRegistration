import { SubmitButton } from './styled';

export const Button = ({ submittable }: any) => {
  
  return (
    <SubmitButton htmlType="submit" disabled={!submittable}>
      Submit
    </SubmitButton>
  );
};
