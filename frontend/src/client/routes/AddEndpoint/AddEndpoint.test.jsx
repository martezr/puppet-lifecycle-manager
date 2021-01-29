import React from 'react';
import { shallow } from 'enzyme';

import AddEndpoint from './AddEndpoint';

test('renders without crashing', () => {
  const requiredProps = {
    t: s => s,
  };

  shallow(<AddEndpoint {...requiredProps} />);
});
