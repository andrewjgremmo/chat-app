import React from 'react';
import { Component } from 'react';
import RoomList from '../components/roomList';
import Room from '../components/room';
import Register from '../components/register';

export default class Root extends Component {
  render() {
    return (
      <div className="container">
        <Register />
        <RoomList />
        <Room />
      </div>
    );
  }
}