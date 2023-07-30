import { Typography } from 'antd';
import { styled } from 'styled-components';

const {
  Title: TypoTitle,
  Text: TypoText,
  Paragraph: TypoParagraph,
} = Typography;

export const HeaderContainer = styled('div')`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Title = styled(TypoTitle)`
  margin-bottom: 0px !important;
`;

export const Text = styled(TypoText)`
  color: red;
  font-weight: 700;
`;

export const Paragraph = styled(TypoParagraph)`
  margin-bottom: 18px;
  font-weight: 500;
`;
