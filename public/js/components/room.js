import React, { Component } from 'react';

export default class Room extends Component {
  state = {
    messageInput: ""
  }

  renderMessages() {
    const roomIdx = this.props.currentRoomList.map((room) => {
      return room._id
    }).indexOf(this.props.currentRoom);
    let idx = 0;

    return this.props.currentRoomList[roomIdx].messages.map((message) => {
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
      author: this.props.user.username,
      message: this.state.messageInput,
      room: this.props.currentRoom
    });
    this.setState({messageInput: ""});
  }

  render() {
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
  }
}