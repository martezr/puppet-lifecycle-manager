import React from 'react';
import { shallow } from 'enzyme';

import Dashboard from './Dashboard';

test('renders without crashing', () => {
  const requiredProps = {
    t: s => s,
  };

  shallow(<Dashboard {...requiredProps} />);
});
