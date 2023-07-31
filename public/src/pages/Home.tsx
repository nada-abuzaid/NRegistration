import { useLocation } from 'react-router-dom';
import { Notification } from '../components/Notifications';
import { Content, Title, HomeContainer} from './styled';

export const Home = () => {
  const location = useLocation();
  const successMessage = location.state && location.state.message;
  return (
    <HomeContainer>
      <Content>
        <Title>Start your Journey with us!</Title>
        {successMessage && <Notification successMessage={successMessage} />}
      </Content>
    </HomeContainer>
  );
};
