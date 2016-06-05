import React, { Component } from 'react';

export default class UserList extends Component {
  renderUsers() {
    const roomIdx = this.props.currentRoomList.map((room) => {
      return room._id;
    }).indexOf(this.props.currentRoom);

    return this.props.users.map((user) => {
      if (user.rooms.indexOf(this.props.currentRoom) > -1) {
        return(
          <li key={user._id}>{user.username}</li>
        )
      }
    });
  }

  render() {
    if (this.props.currentRoom) {
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
