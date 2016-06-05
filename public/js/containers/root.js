import React from 'react';
import { Component } from 'react';
import Register from '../components/register';
import Chat from '../components/chat';

export default class Root extends Component {
  render() {
    return (
      <div className="container">
        <Register />
        <Chat />
      </div>
    );
  }
}