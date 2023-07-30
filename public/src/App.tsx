import { Col, Row } from 'antd';
import { FormDisabledDemo } from './components/Form';
import './index.css';

const App = () => (
  <Row>
    <Col span={12}>
      <div className="side" />
    </Col>
    <Col span={12}>
      <FormDisabledDemo />
    </Col>
  </Row>
);

export default App;


  // const fetchData = async (endpoint: any, key: any) => {
  //   try {
  //     const { data } = await axios.get(`http://localhost:3000/${endpoint}`);
  //     setIsLoading(false);

  //     const options =
  //       key === 'country'
  //         ? data.map((country: any) => ({
  //             id: country.code,
  //             value: country.code,
  //             label: country.name,
  //           }))
  //         : data.map((region: any) => ({
  //             id: region.country,
  //             value: region.region,
  //             label: region.region,
  //           }));

  //     const updatedInputs = BUSINESS_INPUTS.map((input) =>
  //       input.name === key ? { ...input, options: options } : input
  //     );
  //     console.log(updatedInputs);

  //     setBusinessInputs(updatedInputs);
  //   } catch {
  //     setIsLoading(false);
  //     console.log('Error');
  //   }
  // };
