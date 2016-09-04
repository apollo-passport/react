import React, { Component, PropTypes } from 'react';

const styles = {
  loginEmailPassword: {
    backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAAXNSR0IArs4c6QAAAPhJREFUOBHlU70KgzAQPlMhEvoQTg6OPoOjT+JWOnRqkUKHgqWP4OQbOPokTk6OTkVULNSLVc62oJmbIdzd95NcuGjX2/3YVI/Ts+t0WLE2ut5xsQ0O+90F6UxFjAI8qNcEGONia08e6MNONYwCS7EQAizLmtGUDEzTBNd1fxsYhjEBnHPQNG3KKTYV34F8ec/zwHEciOMYyrIE3/ehKAqIoggo9inGXKmFXwbyBkmSQJqmUNe15IRhCG3byphitm1/eUzDM4qR0TTNjEixGdAnSi3keS5vSk2UDKqqgizLqB4YzvassiKhGtZ/jDMtLOnHz7TE+yf8BaDZXA509yeBAAAAAElFTkSuQmCC")',
    backgroundAttachment: "scroll",
    backgroundSize: "16px 18px",
    backgroundPosition: "98% 50%",
    backgroundRepeat: "no-repeat"
  },
  changePasswordOld: {
    backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAAXNSR0IArs4c6QAAAPhJREFUOBHlU70KgzAQPlMhEvoQTg6OPoOjT+JWOnRqkUKHgqWP4OQbOPokTk6OTkVULNSLVc62oJmbIdzd95NcuGjX2/3YVI/Ts+t0WLE2ut5xsQ0O+90F6UxFjAI8qNcEGONia08e6MNONYwCS7EQAizLmtGUDEzTBNd1fxsYhjEBnHPQNG3KKTYV34F8ec/zwHEciOMYyrIE3/ehKAqIoggo9inGXKmFXwbyBkmSQJqmUNe15IRhCG3byphitm1/eUzDM4qR0TTNjEixGdAnSi3keS5vSk2UDKqqgizLqB4YzvassiKhGtZ/jDMtLOnHz7TE+yf8BaDZXA509yeBAAAAAElFTkSuQmCC")',
    backgroundAttachment: 'scroll',
    backgroundSize: '16px 18px',
    backgroundPosition: '98% 50%',
    backgroundRepeat: 'no-repeat'
  },
  changePasswordNew: {
    backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACIUlEQVQ4EX2TOYhTURSG87IMihDsjGghBhFBmHFDHLWwSqcikk4RRKJgk0KL7C8bMpWpZtIqNkEUl1ZCgs0wOo0SxiLMDApWlgOPrH7/5b2QkYwX7jvn/uc//zl3edZ4PPbNGvF4fC4ajR5VrNvt/mo0Gr1ZPOtfgWw2e9Lv9+chX7cs64CS4Oxg3o9GI7tUKv0Q5o1dAiTfCgQCLwnOkfQOu+oSLyJ2A783HA7vIPLGxX0TgVwud4HKn0nc7Pf7N6vV6oZHkkX8FPG3uMfgXC0Wi2vCg/poUKGGcagQI3k7k8mcp5slcGswGDwpl8tfwGJg3xB6Dvey8vz6oH4C3iXcFYjbwiDeo1KafafkC3NjK7iL5ESFGQEUF7Sg+ifZdDp9GnMF/KGmfBdT2HCwZ7TwtrBPC7rQaav6Iv48rqZwg+F+p8hOMBj0IbxfMdMBrW5pAVGV/ztINByENkU0t5BIJEKRSOQ3Aj+Z57iFs1R5NK3EQS6HQqF1zmQdzpFWq3W42WwOTAf1er1PF2USFlC+qxMvFAr3HcexWX+QX6lUvsKpkTyPSEXJkw6MQ4S38Ljdbi8rmM/nY+CvgNcQqdH6U/xrYK9t244jZv6ByUOSiDdIfgBZ12U6dHEHu9TpdIr8F0OP692CtzaW/a6y3y0Wx5kbFHvGuXzkgf0xhKnPzA4UTyaTB8Ph8AvcHi3fnsrZ7Wore02YViqVOrRXXPhfqP8j6MYlawoAAAAASUVORK5CYII=")',
    backgroundAttachment: 'scroll',
    backgroundSize: '16px 18px',
    backgroundPosition: '98% 50%',
    backgroundRepeat: 'no-repeat'
  }
};

class SignIn extends Component {

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

SignIn.propTypes = {
  apolloPassport: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

class LoggedInButtons extends Component {

  render() {
    const onClick = this.props.onClick;

    return (

      <div className="login-button"
          id="login-buttons-open-change-password"
          onClick={onClick}>
        Change password
      </div>

    );

  }

}

LoggedInButtons.propTypes = {
  onClick: PropTypes.function
};

class LoggedInOptions extends Component {

  constructor(props) {
    super();
    const ap = props.apolloPassport;
    const userId = props.auth && props.auth.data && props.auth.data.userId;

    this.submit = () => {
      if (!userId)
        throw new Error("no userId?");
      ap.updateUserPassword(userId, this.oldPass.value, this.newPass.value);
    };
  }

  render() {

    return (

      <div>

        <div id="login-old-password-label-and-input">
          <label id="login-old-password-label" htmlFor="login-old-password">
            Current Password
          </label>
          <input id="login-old-password" type="password" autoComplete="off" style={styles.changePasswordOld}
            ref={ref => this.oldPass = ref} />
        </div>

        <div id="login-password-label-and-input">
          <label id="login-password-label" htmlFor="login-password">
            New Password
          </label>
          <input id="login-password" type="password" style={styles.changePasswordNew}
            ref={ref => this.newPass = ref} />
        </div>

        <div className="login-button login-button-form-submit" id="login-buttons-do-change-password"
            onClick={this.submit}>
          Change password
        </div>

      </div>

    );

  }

}

LoggedInOptions.propTypes = {
  apolloPassport: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default { SignIn, LoggedInButtons, LoggedInOptions };
