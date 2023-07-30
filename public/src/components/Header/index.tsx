import {
  HeaderContainer, Paragraph, Text, Title,
} from './styled';

export const Header = () => (
  <HeaderContainer>
    <Title>Welcome there!</Title>
    <Paragraph>
      <Text>Hint: </Text>
      please select the customer type before complete the registration!
    </Paragraph>
  </HeaderContainer>
);
