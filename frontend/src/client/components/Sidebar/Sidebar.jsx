import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Sidebar } from '@puppet/react-components';
import routes from '../../routes/index';

const propTypes = {
  t: PropTypes.func.isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired })
    .isRequired,
};

const AppSidebar = ({ t, location: { pathname } }) => (
  <Sidebar>
    <Sidebar.Header logo="manager" as={Link} to="/" />
    <Sidebar.Navigation>
      <Sidebar.Section>
        <Sidebar.Item title="Dashboard" icon="dashboard" as={Link} to="/" />
        <Sidebar.Item title="Upgrade" icon="share" as={Link} to="/upgrade" />
        <Sidebar.Item title="Endpoints" icon="hardware" as={Link} to="/endpoints" />
      </Sidebar.Section>
      <Sidebar.Section label="Settings">
        <Sidebar.Item title="Admin" icon="gear" as={Link} to="/admin" />
        <Sidebar.Item
          title="Sign out"
          icon="sign-out"
          onClick={() => {
            // eslint-disable-next-line no-alert
            alert('Sign out');
          }}
        />
      </Sidebar.Section>
    </Sidebar.Navigation>
    <Sidebar.Footer username="Admin" version="0.0.1" />
  </Sidebar>
);

AppSidebar.propTypes = propTypes;

export default AppSidebar;
