import React from 'react';
import { Component } from 'react';
import RoomList from '../components/roomList';
import Room from '../components/room';

export default class Root extends Component {
  render() {
    return (
      <div className="container">
        <RoomList />
        <Room />
      </div>
    );
  }
}