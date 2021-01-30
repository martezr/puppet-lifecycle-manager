import Dashboard from 'routes/Dashboard';

import Nodes from 'routes/Nodes';

import Upgrade from 'routes/Upgrade';

import Endpoints from 'routes/Endpoints';

import AddEndpoint from 'routes/AddEndpoint';

const routes = [{
  title: 'Dashboard',
  path: '/',
  view: Dashboard
},
{
  title: 'Nodes',
  path: '/nodes',
  view: Nodes
},
{
  title: 'Upgrade',
  path: '/upgrade',
  view: Upgrade
},
{
  title: 'Endpoints',
  path: '/endpoints',
  view: Endpoints
}, {
  title: 'AddEndpoint',
  path: '/addendpoint',
  view: AddEndpoint
}
];

export default routes;
