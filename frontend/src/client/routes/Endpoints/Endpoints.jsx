import React, { useState, useEffect } from 'react';
import { Breadcrumb, Heading, Button, Text, Link } from '@puppet/react-components';
import './Endpoints.scss';
import { Table } from '@puppet/data-grid';


const buttonStyle = { margin: 2 };

const columns = [
  {
    label: 'Name',
    dataKey: 'name',
  },
  { label: 'Description', dataKey: 'description' },
  { label: 'URL', dataKey: 'url' },
];

const initialValues = {
  Name: '',
  Description: '',
  URL: '',
};

const emptyStateHeader = 'No Endpoints';
const emptyStateMessage = 'Reconnect to service';

const Endpoints = () => {

  const [endpointData, setEndpointData] = useState([]);

  useEffect(() => {
    const fetchEndpointData = async () => {
      const response = await fetch(
        'http://localhost:8090/api/v1/endpoints',
      );
      const endpointinfo = await response.json();
      setEndpointData(endpointinfo.endpoints);
    };
    fetchEndpointData();
  }, []);
  console.log(endpointData)

  return (
  <div className="route-endpoints">
    <Breadcrumb>
      <Breadcrumb.Section>Endpoints</Breadcrumb.Section>
    </Breadcrumb>
  <div className="ScreenHeader">
    <Heading>Puppet Enterprise Endpoints</Heading>
  <div className="ScreenHeader-description">
    <Text>Manage Puppet Enterprise endpoints</Text>
  </div>
<div>
<div className="endpoint-table-header">
<Button icon="plus" style={buttonStyle} as="a" href="/addendpoint">Add Endpoint</Button>
</div>
<div>
<Table selectable data={endpointData} columns={columns} />
</div>
</div>
</div>
</div>
);
};

export default Endpoints;
