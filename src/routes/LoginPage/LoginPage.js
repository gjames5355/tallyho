import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import './LoginPage.css';

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || '/tasks';
    history.push(destination);
  };

  render() {
    return (
      <section className='LoginPage'>
        <h2 className='login-page-header'>
          <Link to={'/login'} className='tallyho-logo-front'>
            Tallyho!
          </Link>
        </h2>
        <LoginForm onLoginSuccess={this.handleLoginSuccess} />
      </section>
    );
  }
}
