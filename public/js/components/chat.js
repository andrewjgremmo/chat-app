import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RoomList from '../components/roomList';
import Room from '../components/room';
import UserList from '../components/userList';
import * as RoomActions from '../actions/roomActions';

export default class Chat extends Component {
  render() {
    if (this.props.user) {
      return (
        <div className="chat">
          <RoomList
            actions={this.props.actions}
            rooms={this.props.rooms}
            user={this.props.user} />
          <Room
            actions={this.props.actions}
            currentRoom={this.props.currentRoom}
            rooms={this.props.rooms}
            user={this.props.user} />
          <UserList
            currentRoom={this.props.currentRoom}
            rooms={this.props.rooms}
            user={this.props.user} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Chat);