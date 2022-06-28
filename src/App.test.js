import React from 'react';
import App from './App'
import { shallow } from 'enzyme';

describe('Just a test', () => {
  test('Is there a paragraph inside of <App />?', () => {
    const wrapper = shallow(<App />);
    console.log(wrapper.debug())
    expect(wrapper.find('p').text()).toContain('i am not here.')
  });
});