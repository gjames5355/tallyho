import React from 'react';
import ReactDOM from 'react-dom';
import TaskListPage from './TaskListPage';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const testTasks = [
    {
      id: 1,
      title: 'test title',
      image: 'https//testimage.com',
      checked: false,
      user_id: 1,
    },
  ];
  ReactDOM.render(<TaskListPage key={testTasks.id} tasks={testTasks} />, div);

  ReactDOM.unmountComponentAtNode(div);
});
