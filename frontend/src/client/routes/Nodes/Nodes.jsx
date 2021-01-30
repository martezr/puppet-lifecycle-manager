import React, { useState, useEffect } from 'react';
import { Breadcrumb, Heading, Button, Text, Link } from '@puppet/react-components';
import './Nodes.scss';
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

const emptyStateHeader = 'No Nodes';
const emptyStateMessage = 'Add endpoints by clicking the Add Endpoint button';

const Nodes = () => {

  const [endpointData, setEndpointData] = useState([]);

  useEffect(() => {
    const fetchEndpointData = async () => {
      const response = await fetch(
        'http://localhost:8090/api/v1/nodes',
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
      <Breadcrumb.Section>Nodes</Breadcrumb.Section>
    </Breadcrumb>
  <div className="ScreenHeader">
    <Heading>Puppet Enterprise Nodes</Heading>
  <div className="ScreenHeader-description">
    <Text>Puppet Enterprise agents</Text>
  </div>
<div>
<div>
<Table 
    selectable 
    data={endpointData} 
    columns={columns}     
    emptyStateHeader={emptyStateHeader}
    emptyStateMessage={emptyStateMessage}
/>
</div>
</div>
</div>
</div>
);
};

export default Nodes;
