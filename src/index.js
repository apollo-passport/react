import React, { Component, PropTypes } from 'react';

function bindValues(obj, that) {
  const out = {};
  for (const key in obj)
    out[key] = obj[key].bind(that);
  return out;
}

const styles = {
  loginEmailPassword: {
    backgroundImage: "url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAAXNSR0IArs4c6QAAAPhJREFUOBHlU70KgzAQPlMhEvoQTg6OPoOjT+JWOnRqkUKHgqWP4OQbOPokTk6OTkVULNSLVc62oJmbIdzd95NcuGjX2/3YVI/Ts+t0WLE2ut5xsQ0O+90F6UxFjAI8qNcEGONia08e6MNONYwCS7EQAizLmtGUDEzTBNd1fxsYhjEBnHPQNG3KKTYV34F8ec/zwHEciOMYyrIE3/ehKAqIoggo9inGXKmFXwbyBkmSQJqmUNe15IRhCG3byphitm1/eUzDM4qR0TTNjEixGdAnSi3keS5vSk2UDKqqgizLqB4YzvassiKhGtZ/jDMtLOnHz7TE+yf8BaDZXA509yeBAAAAAElFTkSuQmCC&quot;)",
    backgroundAttachment: "scroll",
    backgroundSize: "16px 18px",
    backgroundPosition: "98% 50%",
    backgroundRepeat: "no-repeat"
  }
};

const LoginButtonsUI = ({ auth, showSignInPopup, actions }) => (
  <div id="login-buttons" className="login-buttons-dropdown-align-left">
    <div className="login-link-and-dropdown-list login-form-sign-in">
      <If condition={auth.userId}>
        <div onClick={actions.logout}>
          Log Out from {auth.userId}
        </div>
      <Else />
          <If condition={showSignInPopup}>
            <div className="accounts-dialog">
              <a className="login-close-text" onClick={actions.close}>Close</a>
              <div className="login-close-text-clear"></div>
              <If condition={true}>
                <If condition={false}>
                <div className="or">
                  <span className="hline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span className="or-text">or</span>
                  <span className="hline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </div>
                </If>
                <EmailSignin actions={actions} />
              </If>
            </div>
          <Else />
            <a className="login-link-text" onClick={actions.open}>
              Sign in ▾
            </a>
          </If>
      </If>
    </div>
  </div>
);
LoginButtonsUI.propTypes = {
  auth: PropTypes.object,
  showSignInPopup: PropTypes.bool,
  actions: PropTypes.object
}

class EmailSignin extends Component {

  constructor() {
    super();

    this.login = () => {
      this.props.actions.login(this.email.value, this.password.value);
    };
  }

  render() {

    return (
      <div className="login-form login-password-form">
        
        <div id="login-email-label-and-input">
          <label id="login-email-label" htmlFor="login-email">
            Email
          </label>
          <input id="login-email" type="email" autoComplete="off"
            ref={ref => this.email = ref} style={styles.loginEmailPassword} />
        </div>

        <div id="login-password-label-and-input">
          <label id="login-password-label" htmlFor="login-password">
            Password
          </label>
          <input id="login-password" type="password" autoComplete="off"
            ref={ref => this.password = ref} style={styles.loginEmailPassword} />
        </div>

        <div className="login-button login-button-form-submit" id="login-buttons-password"
          onClick={this.login}>Sign in</div>

        <div className="additional-link-container">
          <a id="signup-link" className="additional-link">Create account</a>
        </div>
        
        <div className="additional-link-container">
          <a id="forgot-password-link" className="additional-link">Forgot password</a>
        </div>

      </div>
    );
  }
}

LoginButtonsUI.propTypes = {
  state: PropTypes.object,
  actions: PropTypes.object
};

const actions = {

  open() {
    this.setState({ showSignInPopup: true });
  },
  close() {
    this.setState({ showSignInPopup: false });
  },

  login(email, password) {
    this.apolloPassport.loginWithEmail(email, password);
  },
  logout() {
    this.apolloPassport.logout();
  }

};

class LoginButtons extends Component {

  constructor({ apolloPassport }) {
    super();
    this.actions = bindValues(actions, this);
    this.apolloPassport = apolloPassport;

    this.state = {
      auth: apolloPassport.getState(),
      showSignInPopup: false
    };

    this.apStateHandler = function apStateHandler(state) {
      this.setState({ auth: state });
    }.bind(this);

    apolloPassport.subscribe(this.apStateHandler);
  }

  componentWillUnmount() {
    this.apolloPassport.unsubscribe(this.apStateHandler);
  }

  render() {
    return (
      <LoginButtonsUI {...this.state} actions={this.actions} />
    );
  }

}

export { LoginButtons };
