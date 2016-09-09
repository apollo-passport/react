import { Component, PropTypes, Children } from 'react';
import ApolloPassport from 'apollo-passport/lib/client';

class ApolloPassportProvider extends Component {

  getChildContext() {
    return { apolloPassport: this.props.apolloPassport }
  }

  render() {
    return Children.only(this.props.children);
  }

}

ApolloPassportProvider.propTypes = {
  apolloPassport: PropTypes.instanceOf(ApolloPassport),
  children: PropTypes.element.isRequired
}

ApolloPassportProvider.childContextTypes = {
  apolloPassport: PropTypes.instanceOf(ApolloPassport)
}

export default ApolloPassportProvider;
