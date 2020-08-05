import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import './LoginForm.css';

export default class LoginForm extends Component {
  state = {
    error: null,
  };

  static contextType = UserContext;

  handleSubmitJwtAuth = event => {
    event.preventDefault();
    this.setState({
      error: null,
    });
    const { email, password } = event.target;

    AuthApiService.postLogin({
      email: email.value,
      password: password.value,
    })
      .then(res => {
        email.value = ' ';
        password.value = ' ';
        this.context.processLogin(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch(res => {
        this.setState({
          error: res.error,
        });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form className='login-form' onSubmit={this.handleSubmitJwtAuth}>
        <div role='alert'>{error && <p className='black'>{error}</p>}</div>
        <h2 className='sub-header'>Ready for a new day?</h2>
        <div className='email'>
          <label htmlFor='LoginForm_email'></label>
          <input
            className='front-input'
            required
            id='email-field'
            name='email'
            type='text'
            placeholder='Email'
          ></input>
        </div>
        <div className='password'>
          <label htmlFor='LoginForm_password'></label>
          <input
            className='front-input'
            required
            id='password-field'
            name='password'
            type='password'
            placeholder='Password'
          ></input>
        </div>
        <button className='login-button'>Login</button>
        <div className='sign-up-block'>
          <p className='account-suggestion'>Need an Account?</p>
          <p className='signup-link'>
            <Link to={`/register`} className='link'>
              Sign up!
            </Link>
          </p>
        </div>
      </form>
    );
  }
}
