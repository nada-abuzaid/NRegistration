import { RegisterForm, Header } from '../components';
import { Col, Row } from 'antd';
import { Container, Side } from './styled';

export default function Home() {
  return (
    <Row gutter={[12, 12]}>
      <Col xs={24} sm={12} md={12}>
        <Side />
      </Col>
      <Col xs={24} sm={12} md={12}>
        <Container>
          <Header />
          <RegisterForm />
        </Container>
      </Col>
    </Row>
  );
}
