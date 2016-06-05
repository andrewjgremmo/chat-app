import React, { Component } from 'react';

export default class UserList extends Component {
  renderUsers() {
    console.log(this.props);
    const roomIdx = this.props.rooms.map((room) => {
      return room._id;
    }).indexOf(this.props.currentRoom);

    return this.props.rooms[roomIdx].users.map((user) => {
      return(
        <li key={user._id}>{user.username}</li>
      )
    });
  }

  render() {
    if (this.props.user && this.props.currentRoom) {
      return (
        <div className="user-list">
          <ul className="user-list">
            {this.renderUsers()}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }
}
