import React from 'react';
import ReactDOM from 'react-dom';
import EditModePage from './EditModePage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    testTask: {
      id: 1,
      title: 'test title',
      image: 'https//testimage.com',
      checked: false,
      user_id: 1,
    },
  };

  ReactDOM.render(
    <EditModePage
      task={props.testTask}
      taskTitle={props.testTask.title}
      taskImage={props.testTask.image}
    />,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
