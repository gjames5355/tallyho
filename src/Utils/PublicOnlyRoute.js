import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from '../services/token-service';
import UserContext from '../contexts/UserContext';

export default function PublicOnlyRoute({ component, ...props }) {
  const Component = component;
  return (
    <Route
      {...props}
      render={componentProps => (
        <UserContext.Consumer>
          {userContext =>
            !!userContext.user.id ? (
              <Redirect to={'/tasks'} />
            ) : (
              <Component {...componentProps} />
            )
          }
        </UserContext.Consumer>
      )}
    />
  );
}
