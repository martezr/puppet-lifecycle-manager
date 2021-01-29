import React, { useState, useEffect } from 'react';
import { Heading, Breadcrumb, Table, Text, Card, Badge } from '@puppet/react-components';

import './Dashboard.scss';

const cardExampleStyle = {
  width: 400,
  height: 200,
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 12,
};

const columns = [
  { label: 'Server', dataKey: 'server'},
  { label: 'Name', dataKey: 'name' },
  { label: 'Recommendation', dataKey: 'recommendation' },
//  { label: 'Details', dataKey: 'details' },
  { label: 'Condition', dataKey: 'condition' },
  {
    label: 'Tags',
    dataKey: 'tags',
    cellRenderer: ({ cellData }) => <Badge type="info">{cellData}</Badge>,
  },
];

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'http://localhost:8000/api/v1/recommendations',
      );
      const json = await response.json();
      setData(json.recommendations);
    };
    fetchData();
  }, []);
  console.log(data)

  const [endpointData, setEndpointData] = useState([]);

  useEffect(() => {
    const fetchEndpointData = async () => {
      const response = await fetch(
        'http://localhost:8090/api/v1/dashboard',
      );
      const endpointinfo = await response.json();
      setEndpointData(endpointinfo);
    };
    fetchEndpointData();
  }, []);
  console.log(endpointData)
  

  return (
    <div className="route-dashboard">
      <Breadcrumb>
        <Breadcrumb.Section>Dashboard</Breadcrumb.Section>
      </Breadcrumb>
      <div className="ScreenHeader">
      <Heading>Dashboard</Heading>
        <div>
    <div className="rc-metrics">
    <div style={{ display: 'flex' }}>
      <Card elevation={100} style={cardExampleStyle}>
        <Heading as="h1">{endpointData.servers}</Heading>
        <Text>Puppet Enterprise Servers</Text>
      </Card>
      <Card elevation={100} style={cardExampleStyle}>
        <Heading as="h1">{endpointData.nodecount}</Heading>
        <Text>Total Number of Nodes</Text>
      </Card>
      <Card elevation={100} style={cardExampleStyle}>
        <Heading as="h1">{endpointData.healthy_servers}</Heading>
        <Text>Healthy Servers</Text>
      </Card>
    </div>
    </div>
    <div className="rc-table-header">
    <Heading as="h2">Recommendations</Heading>
    <Text>The following recommendations have been identified based upon the configuration of your system.</Text>
    </div>
    <Table data={data} columns={columns} rowKey="name" />
    </div>
      </div>
    </div>
  );
};

export default Dashboard;
