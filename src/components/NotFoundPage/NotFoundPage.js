import React, { Component } from 'react';
import './NotFoundPage.css';
import child from '../../img/6057415565_b3ecdc5af8_b.jpg';

export default class NotFoundPage extends Component {
  render() {
    return (
      <section className='NotFoundPage'>
        <h2 className='not-found-header'>
          You hit a 404 which is computer lingo for this page doesn't exist!
        </h2>
        <img className='oh-no-child' src={child} alt='guilty child'></img>
        <h3 className='not-found-header'>
          Try going back to the page you were at before
        </h3>
      </section>
    );
  }
}
