import React, { useState, useEffect } from 'react';
import { Breadcrumb, Heading, Button, Text, Link, Form, Modal } from '@puppet/react-components';
import './AddEndpoint.scss';
import { Redirect } from 'react-router-dom';


const initialValues = {
  name: '',
  description: '',
  url: '',
  token: '',
  certificate: ''
};

const submitForm = values => {
  console.log(JSON.stringify(values))
  fetch('http://localhost:8090/api/v1/endpoints', {
      method: 'post',
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
      },
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(values)
    }).then(function(response) {
      console.log(response)
      return response.json();
    });
}


class AddEndpoint extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: initialValues,
      submitting: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleCancel = this.onCancel.bind(this);
  }


  onSubmit(values) {
    this.setState({ submitting: true });

    submitForm(values);

    this.setState({ submitting: false, values });
    return <Redirect to="/endpoints" />
  }

  onCancel() {
    return <Redirect to="/endpoints" />
  }

  render() {
    const { values, submitting } = this.state;

    return (
      <div className="route-endpoints">
        <Breadcrumb>
          <Breadcrumb.Section href="/endpoints">Endpoints</Breadcrumb.Section>
          <Breadcrumb.Section>Add Endpoint</Breadcrumb.Section>
        </Breadcrumb>
      <div className="ScreenHeader">
      <Heading>Add PE Endpoints</Heading>
      <div className="ScreenHeader-description">
        <Text>Add a Puppet Enterprise endpoint</Text>
      </div>
  <div>
  <Form
          submittable
          cancellable
          initialValues={values}
          submitting={submitting}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
        >
          <Form.Field
           type="text"
           name="name"
           label="Name"
           placeholder="Name"
         />
         <Form.Field
           type="text"
           name="description"
           label="Description"
           placeholder="description"
         />
         <Form.Field
           type="text"
           name="url"
           label="URL"
           placeholder="Puppet Enterprise URL - https://peprod1.domain.local"
         />
         <Form.Field
           type="password"
           name="token"
           label="Token"
           placeholder="*********"
         />
         <Form.Field
           type="multiline"
           name="certificate"
           label="Certificate"
           placeholder="Certificate Here"
         />
       </Form>
  </div>
  </div>
  </div>
    );
  }
}

export default AddEndpoint;
