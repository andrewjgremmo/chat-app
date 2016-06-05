import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CurrentRoomList from '../components/currentRoomList';
import Room from '../components/room';
import PublicRoomList from '../components/publicRoomList';
import UserList from '../components/userList';
import * as RoomActions from '../actions/roomActions';

export default class Chat extends Component {
  render() {
    if (this.props.user) {
      return (
        <div className="chat">
          <PublicRoomList
            actions={this.props.actions}
            publicRoomList={this.props.publicRoomList}
            currentRoomList={this.props.currentRoomList}
            user={this.props.user} />
          <CurrentRoomList
            actions={this.props.actions}
            currentRoomList={this.props.currentRoomList}
            user={this.props.user} />
          <Room
            actions={this.props.actions}
            currentRoom={this.props.currentRoom}
            currentRoomList={this.props.currentRoomList}
            user={this.props.user} />
          <UserList
            currentRoom={this.props.currentRoom}
            currentRoomList={this.props.currentRoomList}
            user={this.props.user}
            users={this.props.users} />
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
    users: state.user.users,
    currentRoomList: state.rooms.currentRoomList,
    publicRoomList: state.rooms.publicRoomList,
    currentRoom: state.rooms.currentRoom
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(RoomActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);