import React, { Component } from 'react';
import Modal from 'react-modal';
import differenceBy from 'lodash/differenceBy';

export default class PublicRoomList extends Component {
  constructor(props) {
    super(props);
    this.props.actions.getPublicRooms();
  }

  state = {
    modalIsOpen: false
  }

  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  renderRooms() {
    return differenceBy(this.props.publicRoomList, this.props.currentRoomList, '_id')
      .map((room) => {
        return(
          <li
            key={room._id}
            onClick={() => {
                this.props.actions.joinRoom(this.props.user, {room: room._id});
                this.closeModal();
              }
            }
          >
            {room.name}
          </li>
        )
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
      <div className="public-rooms">
        <span onClick={this.openModal}>Search Public Rooms</span>
        <Modal {...modalProps} >
          <ul className="public-rooms-list">
            {this.renderRooms()}
          </ul>
        </Modal>
      </div>
    );
  }
}
