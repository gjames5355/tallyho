import React from 'react';
import ReactDOM from 'react-dom';
import TaskListMain from './TaskListMain';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
      <TaskListMain />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
