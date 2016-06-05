import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UserActions from '../actions/userActions';

export default class Register extends Component {
  state = {
    registerInput: ""
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.actions.register(this.state.registerInput);
    this.setState({registerInput: ""});
  }

  render() {
    if (this.props.user) {
      return null;
    } else {
      return (
        <div className="register">
          <form
            onSubmit={this.onSubmit}
          >
            <input
              type="text"
              onChange={this.onChange}
              name="registerInput"
              value={this.state.registerInput}
            />
            <button>Submit</button>
          </form>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);