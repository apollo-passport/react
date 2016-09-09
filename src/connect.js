import React, { Component, PropTypes } from 'react';
import ApolloPassport from 'apollo-passport/lib/client';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default function apolloPassportConnect(mapStateToProps) {

  return function wrapWithApolloPassportConnect(ComponentToWrap) {

    const connectDisplayName = 'ApolloPassportConnect('
      + getDisplayName(ComponentToWrap) + ')';

    class ApolloPassportConnect extends Component {
      constructor(props, context) {
        super(props, context);
        const apolloPassport = this.apolloPassport = context.apolloPassport;

        this.state = { auth: apolloPassport.getState() };
        apolloPassport.subscribe(auth => this.setState({ auth }));
      }

      componentWillUnmount() {
        this.apolloPassport.unsubscribe(this.setState);
      }

      render() {
        const mapped = mapStateToProps ? mapStateToProps(this.state) : this.state;

        return (
          <ComponentToWrap {...this.props} {...mapped} />
        )
      }
    }

    ApolloPassportConnect.displayName = connectDisplayName;
    ApolloPassportConnect.WrappedComponent = ComponentToWrap;

    ApolloPassportConnect.contextTypes = {
      apolloPassport: PropTypes.instanceOf(ApolloPassport)
    }

    return ApolloPassportConnect;

  }

}
