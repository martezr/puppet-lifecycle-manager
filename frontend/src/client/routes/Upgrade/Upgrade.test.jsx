import React from 'react';
import { shallow } from 'enzyme';

import Upgrade from './Upgrade';

test('renders without crashing', () => {
  const requiredProps = {
    t: s => s,
  };

  shallow(<Upgrade {...requiredProps} />);
});
