import React, { Component } from 'react';

export default class RoomList extends Component {
  componentDidMount() {
    this.props.actions.getRooms(this.props.user._id);
  }

  renderRooms() {
    return this.props.rooms.map((room) => {
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
        <div className="room-list">
          <span>Search Rooms</span>
          <ul className="room-list">
            {this.renderRooms()}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }
}
