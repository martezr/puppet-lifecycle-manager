import React from 'react';
import { shallow } from 'enzyme';

import Nodes from './Nodes';

test('renders without crashing', () => {
  const requiredProps = {
    t: s => s,
  };

  shallow(<Nodes {...requiredProps} />);
});
