import { Col, Row } from 'antd';
import { FormDisabledDemo } from './components/Form';
import './index.css';

const App = () => {
  return (
      <Row>
        <Col span={12}>
          <div className="side"></div>
        </Col>
        <Col span={12}>
          <FormDisabledDemo />
        </Col>
      </Row>
  );
};

export default App;
