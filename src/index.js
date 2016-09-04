import React, { Component, PropTypes } from 'react';
import Local from './local';

function bindValues(obj, that) {
  const out = {};
  for (const key in obj)
    out[key] = obj[key].bind(that);
  return out;
}

const LoginButtonsUI = ({ auth, showPopup, actions, apolloPassport }) => (
  <div id="login-buttons" className="login-buttons-dropdown-align-left">
    <div className="login-link-and-dropdown-list login-form-sign-in">
      <If condition={showPopup}>

        <div id="login-dropdown-list" className="accounts-dialog">
          <a className="login-close-text" onClick={actions.close}>Close</a>
          <div className="login-close-text-clear"></div>

          <If condition={auth.data.userId}>

            <If condition={showPopup === 'changePass'}>

              <Local.LoggedInOptions auth={auth} apolloPassport={apolloPassport} actions={actions} />

            <Else />

              <Local.LoggedInButtons onClick={actions.showPopupChangePass} actions={actions} />

              <div className="login-button" id="login-buttons-logout" onClick={actions.logout}>
                Sign out
              </div>

            </If>

          <Else />

            <If condition={apolloPassport.discovered.services}>

              <For each="service" of={apolloPassport.discovered.services}>
                <div key={service.name} className="login-text-and-button">
                  <div className="login-button single-login-button " id={"login-buttons-"+service.name} onClick={service.open}>
                    <div className="login-image" style={{backgroundImage:service.iconUrl}} id={"login-buttons-image-"+service.name}></div>
                    <span className={"text-besides-image sign-in-text-"+service.name}>Sign in with {service.label}</span>
                  </div>
                </div>
              </For>

            </If>

            <If condition={apolloPassport.discovered.services && true /* local */}>
              <div key="or" className="or">
                <span className="hline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className="or-text">or</span>
                <span className="hline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              </div>
            </If>

            <Local.SignIn key="local" auth={auth} apolloPassport={apolloPassport} actions={actions} />

          </If>{/* condition={auth.data.userId} */}

        </div>{/* .accounts-dialog */}

      <Else />

        <If condition={auth.data.userId}>

          <div onClick={actions.open}>
            {auth.data.userId} ▾
          </div>

        <Else />

          <a className="login-link-text" onClick={actions.open}>
            Sign in ▾
          </a>

        </If>{/* condition={auth.data.userId} */}

      </If>{/* condition={showPopup} */}

    </div>
  </div>
);
LoginButtonsUI.propTypes = {
  auth: PropTypes.object.isRequired,
  showPopup: PropTypes.oneOfType([ PropTypes.bool, PropTypes.string ]),
  actions: PropTypes.object.isRequired,
  apolloPassport: PropTypes.object.isRequired
};

const actions = {

  open() {
    this.setState({ showPopup: true });
  },

  close() {
    this.setState({ showPopup: false });
  },

  logout() {
    this.apolloPassport.logout();
    this.actions.close();
  }

};

function showPopup(state) {
  return function() { this.setState({ showPopup: state }); }
}

actions.showPopupChangePass = showPopup('changePass');

class LoginButtons extends Component {

  constructor({ apolloPassport }) {
    super();

    if (!apolloPassport) {
      // TODO this can happen with SSR, need to think about this more
      // i.e. can we show the login state?
      this.state = {
        auth: {
          data: {}
        },
        showPopup: false
      };

      this.actions = {};
      this.apolloPassport = {};

      return;
    }

    this.actions = bindValues(actions, this);
    this.apolloPassport = apolloPassport;

    this.state = {
      auth: apolloPassport.getState(),
      showPopup: false
    };

    this.apStateHandler = auth => {
      this.setState({ auth });
      if (auth.data.userId)
        this.setState({ showPopup: false });
    };

    apolloPassport.subscribe(this.apStateHandler);
  }

  componentWillUnmount() {
    this.apolloPassport.unsubscribe(this.apStateHandler);
  }

  render() {
    return (
      <LoginButtonsUI {...this.state} actions={this.actions} apolloPassport={this.apolloPassport} />
    );
  }

}

export { LoginButtons };
