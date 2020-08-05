import React, { Component } from 'react';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import { Link } from 'react-router-dom';
import './RegistrationPage.css';

export default class RegistrationPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  handleRegistrationSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || '/login';
    history.push(destination);
  };

  render() {
    return (
      <section className='registration-page'>
        <h2 className='registration-header'>
          <Link to={'/login'} className='tallyho-logo-front'>
            Tallyho!
          </Link>
        </h2>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    );
  }
}
