import React, { Component } from 'react';
import Modal from 'react-modal';

export default class CreateRoom extends Component {
  state = {
    modalIsOpen: false,
    roomName: "",
    roomPrivate: 'false'
  }

  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.actions.joinRoom(this.props.user, {
      name: this.state.roomName,
      private: this.state.roomPrivate != 'false'
    });
    this.closeModal();
  }

  render() {
    const modalProps = {
      isOpen: this.state.modalIsOpen,
      onRequestClose: this.closeModal,
      style: {
        overlay: {
          zIndex: 10000
        },
        content: {
          height: '100px',
          width: '200px',
          position: 'absolute',
          margin: 'auto',
          textAlign: 'center'
        }
      }
    }
    return (
      <div className="create-room">
        <span onClick={this.openModal}>Create Room</span>
        <Modal {...modalProps} >
          <form className="create-room-form">
            <label for="roomName">Name</label>
            <input
              type="text"
              name="roomName"
              value={this.state.searchInput}
              onChange={this.onChange}
            />
            <span>Public</span>
            <input
              type="radio"
              name="roomPrivate"
              checked={this.state.roomPrivate == 'false'}
              value={false}
              onChange={this.onChange}
            />
            <span>Private</span>
            <input
              type="radio"
              name="roomPrivate"
              value={true}
              onChange={this.onChange}
            />
            <button onClick={this.onSubmit}>Create</button>
          </form>
        </Modal>
      </div>
    );
  }
}
