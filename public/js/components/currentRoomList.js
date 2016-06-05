import React, { Component } from 'react';

export default class CurrentRoomList extends Component {
  constructor(props) {
    super(props);
    this.props.actions.getCurrentRooms(this.props.user._id);
  }

  renderRooms() {
    return this.props.currentRoomList.map((room) => {
      const className = (room._id == this.props.currentRoom) ? "selected" : null;
      return(
        <li
          key={room._id}
          className={className}
          onClick={() => this.props.actions.selectRoom(room)}
          >
          {room.name}
        </li>
      )
    });
  }

  render() {
    if (this.props.user) {
      return (
        <div className="current-rooms">
          <ul className="current-room-list">
            {this.renderRooms()}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }
}
