import { RegisterForm, Header } from '../components';
import { Col, Row } from 'antd';
import { Container, Side } from './styled';

export default function Home() {
  return (
    <Row>
      <Col span={12}>
        <Side />
      </Col>
      <Col span={12}>
        <Container>
          <Header />
          <RegisterForm />
        </Container>
      </Col>
    </Row>
  );
}
