import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as RoomActions from '../actions/roomActions';

export default class Room extends Component {
  state = {
    messageInput: ""
  }

  renderMessages() {
    const roomIdx = this.props.rooms.map((room) => {
      return room._id
    }).indexOf(this.props.currentRoom);

    return this.props.rooms[roomIdx].messages.map((message) => {
      return(
        <li
          key={message._id}
        >
          {message.author}: {message.message}
        </li>
      )
    });
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.actions.sendMessage({
      author: "Andrew",
      message: this.state.messageInput,
      room: this.props.currentRoom
    });
    this.setState({messageInput: ""});
  }

  render() {
    if (this.props.user) {
      return (
        <div className="room">
          <ul className="message-list">
            {this.props.currentRoom ? this.renderMessages() : null }
          </ul>
          <form
            onSubmit={this.onSubmit}
          >
            <input
              type="text"
              onChange={this.onChange}
              name="messageInput"
              value={this.state.messageInput}
            />
            <button>Submit</button>
          </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Room);