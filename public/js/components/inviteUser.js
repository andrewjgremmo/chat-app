import React, { Component } from 'react';
import Modal from 'react-modal';
import differenceBy from 'lodash/differenceBy';

export default class InviteUser extends Component {
  state = {
    modalIsOpen: false
  }

  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  renderUsers() {
    return this.props.users.map((user) => {
      if (user.rooms.indexOf(this.props.currentRoom) == -1) {
        return(
          <li
            key={user._id}
            onClick={() => {
                this.props.actions.joinRoom(user, {room: this.props.currentRoom});
                this.closeModal();
              }
            }
          >{user.username}</li>
        )
      }
    });
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
          height: '250px',
          width: '300px',
          position: 'absolute',
          margin: 'auto',
          textAlign: 'center'
        }
      }
    }
    return (
      <div className="invite-user">
        <span onClick={this.openModal}>Invite User to Current Room</span>
        <Modal {...modalProps} >
          <ul className="invite-user-list">
            {this.renderUsers()}
          </ul>
        </Modal>
      </div>
    );
  }
}
