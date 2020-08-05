import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import { Link } from 'react-router-dom';
import './RegistrationForm.css';

export default class RegistrationForm extends Component {
  state = { error: null };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = event.target;

    this.setState({ error: null });
    AuthApiService.postUser({
      email: email.value,
      password: password.value,
    })
      .then(user => {
        email.value = '';
        password.value = '';
        this.props.onRegistrationSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form className='registration-form' onSubmit={this.handleSubmit}>
        <div role='alert'>{error && <p className='black'>{error}</p>}</div>
        <h2 className='sub-header'>It'll just take a second!</h2>
        <div className='email'>
          <label htmlFor='RegistrationForm_email'></label>
          <input
            className='front-input'
            required
            name='email'
            type='text'
            id='RegistrationForm_email'
            placeholder='New User Email'
          ></input>
        </div>
        <div className='password'>
          <label htmlFor='RegistrationForm_password'></label>
          <input
            className='front-input'
            required
            name='password'
            type='password'
            id='RegistrationForm_password'
            placeholder='New User Password'
          ></input>
        </div>
        <button className='register-button'>Register!</button>
        <p className='account-suggestion'>Already have an account?</p>
        <p className='already-account'>
          <Link to={'/login'} className='link'>
            I have an account
          </Link>
        </p>
      </form>
    );
  }
}
