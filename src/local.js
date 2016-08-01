import React, { Component, PropTypes } from 'react';

const styles = {
  loginEmailPassword: {
    backgroundImage: "url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAAXNSR0IArs4c6QAAAPhJREFUOBHlU70KgzAQPlMhEvoQTg6OPoOjT+JWOnRqkUKHgqWP4OQbOPokTk6OTkVULNSLVc62oJmbIdzd95NcuGjX2/3YVI/Ts+t0WLE2ut5xsQ0O+90F6UxFjAI8qNcEGONia08e6MNONYwCS7EQAizLmtGUDEzTBNd1fxsYhjEBnHPQNG3KKTYV34F8ec/zwHEciOMYyrIE3/ehKAqIoggo9inGXKmFXwbyBkmSQJqmUNe15IRhCG3byphitm1/eUzDM4qR0TTNjEixGdAnSi3keS5vSk2UDKqqgizLqB4YzvassiKhGtZ/jDMtLOnHz7TE+yf8BaDZXA509yeBAAAAAElFTkSuQmCC&quot;)",
    backgroundAttachment: "scroll",
    backgroundSize: "16px 18px",
    backgroundPosition: "98% 50%",
    backgroundRepeat: "no-repeat"
  }
};

class LocalSignIn extends Component {

  constructor(props) {
    super();
    const ap = props.apolloPassport;

    this.login = () => ap.loginWithEmailPassword(this.email.value, this.password.value);
    this.signup = () => ap.createUserEmailPassword(this.email.value, this.password.value);

    this.toggleState = () => this.setState({ create: !this.state.create });

    this.state = { create: false };
  }

  render() {
    const { error } = this.props.auth;

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

        <If condition={error}>
          <div className="message error-message">{error}</div>
        </If>

        <If condition={this.state.create}>

          <div className="login-button login-button-form-submit" id="login-buttons-password"
              onClick={this.signup}>
            Create account
          </div>

          <div className="additional-link-container">
            <a id="back-to-login-link" className="additional-link" onClick={this.toggleState}>
              Sign in
            </a>
          </div>

        <Else />

          <div className="login-button login-button-form-submit" id="login-buttons-password"
            onClick={this.login}>Sign in</div>

          <div className="additional-link-container">
            <a id="signup-link" className="additional-link" onClick={this.toggleState}>
              Create account
            </a>
          </div>
          
          <div className="additional-link-container">
            <a id="forgot-password-link" className="additional-link">Forgot password</a>
          </div>

        </If>

      </div>
    );
  }

}

LocalSignIn.propTypes = {
  apolloPassport: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default LocalSignIn;
