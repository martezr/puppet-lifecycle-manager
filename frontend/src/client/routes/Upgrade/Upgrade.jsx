import React from 'react';
import { Heading, Breadcrumb, Button, Select, Link, Text, Table, Card } from '@puppet/react-components';
import './Upgrade.scss';

const data = [
  { id: 1, eventType: 'Processors', currentValue: 4, requiredValue: 4, status: 'PASS' },
  { id: 2, eventType: 'Memory', currentValue: 4096, requiredValue: 8192, status: 'FAIL' },
  { id: 3, eventType: 'Disk Space', currentValue: 75, requiredValue: 50, status: 'PASS' },
];

const columns = [
  { label: 'Check', dataKey: 'eventType', style: { width: '25%' } },
  { label: 'Current', dataKey: 'currentValue', style: { width: '25%' } },
  { label: 'Required', dataKey: 'requiredValue', className: 'column-width-35p' },
  { label: 'Status', dataKey: 'status' },
];

const checkdata = [
  { id: 1, eventType: 'Orchestrator Service ', description: 'Check the status of the PE Orchestrator service', status: 'PASS' },
  { id: 2, eventType: 'Code Manager Service', description: 'Check the status of the PE Code Manager service', status: 'PASS' },
  { id: 3, eventType: 'Puppet Server Service', description: 'Check the status of the PE Puppet Server service', status: 'PASS' },
];

const checkcolumns = [
  { label: 'Check', dataKey: 'eventType', style: { width: '25%' } },
  { label: 'Description', dataKey: 'description', style: { width: '50%' } },
  { label: 'Status', dataKey: 'status' },
];


const options = [
  { value: '2019.8.1', label: '2019.8.1' },
  { value: '2019.8.0', label: '2019.8.0' },
  { value: '2019.7.0', label: '2019.7.0' },
];

const style = { 
  margin: 0,
  width: "40%"
};

const cardExampleStyle = {
  width: "45%",
  height: 150,
  alignItems: 'left',
  marginTop: 15,
  justifyContent: 'left',
  marginRight: 12,
};

const Upgrade = () => (
  <div className="route-upgrade">
  <Breadcrumb>
    <Breadcrumb.Section>Upgrade</Breadcrumb.Section>
  </Breadcrumb>

  <div className="ScreenHeader">
      <Heading>Upgrade Puppet Enterprise</Heading>
    <div className="ScreenHeader-description">
      <Text>Puppet Enterprise upgrade dashboard</Text>
    </div>
    <div>
    <div className="endpoint-table-header">
    </div>
    <div>
  <Select
    id="button-select-one"
    name="select-example"
    options={options}
    placeholder="Select your desired PE version"
    style={style}
    value="2019.7.0"
  />
</div>
<div style={{ display: 'flex' }}>
<Card style={cardExampleStyle}>
  <Card.Title>Release Info</Card.Title>
  <Text>Release Notes: <a href="https://puppet.com/docs/pe/2019.7/release_notes_pe.html" target="_blank">https://puppet.com/docs/pe/2019.7/release_notes_pe.html</a></Text>
  <Text>Known Issues: <a href="https://puppet.com/docs/pe/2019.7/known_issues_pe.html" target="_blank">https://puppet.com/docs/pe/2019.7/known_issues_pe.html</a></Text>
</Card>
</div>
<div className="TableHeader">
<Text>System Requirements</Text>
</div>
<Table data={data} columns={columns} />
<div className="TableHeader">
<Text>Pre-Upgrade Checks</Text>
</div>
<Table data={checkdata} columns={checkcolumns} />
</div>
</div>
  </div>
);

export default Upgrade;
