import React from 'react';
import ReactDOM from 'react-dom';
import TaskListItem from './TaskListItem';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const testTask = [
    {
      title: 'test title',
      image: 'https//testimage.com',
      checked: false,
      user_id: 1,
    },
  ];
  ReactDOM.render(<TaskListItem task={testTask} />, div);

  ReactDOM.unmountComponentAtNode(div);
});
