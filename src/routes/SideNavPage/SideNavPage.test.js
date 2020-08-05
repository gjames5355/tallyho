import React from 'react';
import ReactDOM from 'react-dom';
import SideNavPage from './SideNavPage';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<SideNavPage />, div);

  ReactDOM.unmountComponentAtNode(div);
});
