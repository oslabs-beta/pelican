import React from 'react';
import Enzyme, { shallow } from 'enzyme';

import App from '../client/App';

describe('app component', () => {
  it('it should return true', () => {
    const result = shallow(<App />);
    expect(result).toHaveLength(1);
  });
});
