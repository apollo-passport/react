import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

function bindValues(obj, that) {
  const out = {};
  for (const key in obj)
    out[key] = obj[key].bind(that);
  return out;
}

const LoginButtonsUI = ({ auth, actions }) => (
  <div>
    <If condition={auth.userId}>
      <div onClick={auth.logout}>
        Log Out from {auth.userId}
      </div>
    <Else />
      <div id="login-buttons">
        <a id="login-sign-in-link" onClick={actions.showLoginPopup}>
          Sign in ▾
        </a>

      </div>
    </If>
  </div>
);

LoginButtonsUI.propTypes = {
  state: PropTypes.object,
  actions: PropTypes.object
};

const LoginButtonsNativeActions = {

  login() {
    this.apolloPassport.loginWithEmail('test@test.com', 'x');
  },

  logout() {
    this.apolloPassport.logout();
  }

};

const LoginButtons = connect(
  ({ auth, loginButtons }) => ({ auth, loginButtons })
)(LoginButtonsUI);

/*

historical redux free implementation

class LoginButtonsNative extends Component {

  constructor({ apolloPassport }) {
    super();
    this.actions = bindValues(LoginButtonsNativeActions, this);
    this.apolloPassport = apolloPassport;

    this.apStateHandler = function apStateHandler(state) {
      this.setState(state);
    }.bind(this);

    this.state = apolloPassport.getState();
    apolloPassport.subscribe(this.apStateHandler);
  }

  componentWillUnmount() {
    this.apolloPassport.unsubscribe(this.apStateHandler);
  }

  render() {
    return (
      <LoginButtonsUI state={this.state} actions={this.actions} />
    );
  }

}


*/

export { LoginButtons };
