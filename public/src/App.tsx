import { Col, Row } from 'antd';
import { QueryClient, QueryClientProvider } from 'react-query';
import './index.css';
import Home from './pages';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Row>
      <Col span={12}>
        <div className="side" />
      </Col>
      <Col span={12}>
        <Home />
      </Col>
    </Row>
  </QueryClientProvider>
);

export default App;

