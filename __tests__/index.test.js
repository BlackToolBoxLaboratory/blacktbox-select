import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Sselector from '../module/index.js';

configure({ adapter: new Adapter() });

describe('Test Render Seachelector ...', () => {
  var render;
  test('With mount', () => {
    render = mount(<Sselector className='testCss'/>);
  });
});
