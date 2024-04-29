import React from 'react';
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

const App: React.FC = () => (
  <Space direction="vertical" size={12} style={{width : '400px'}}>
    <RangePicker />
  </Space>
);

export default App;