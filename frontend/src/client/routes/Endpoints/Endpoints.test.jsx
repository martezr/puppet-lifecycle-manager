import React from 'react';
import { shallow } from 'enzyme';

import Endpoints from './Endpoints';

test('renders without crashing', () => {
  const requiredProps = {
    t: s => s,
  };

  shallow(<Endpoints {...requiredProps} />);
});
