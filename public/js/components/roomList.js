import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as RoomActions from '../actions/roomActions';

export default class RoomList extends Component {
  componentWillMount() {
    this.props.actions.getRooms();
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

function mapStateToProps(state) {
  return {
    user: state.user.user,
    rooms: state.rooms.rooms,
    currentRoom: state.rooms.currentRoom
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(RoomActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);