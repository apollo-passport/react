import React, { Component, PropTypes } from 'react';
import invariant from 'invariant';
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
        const apolloPassport = this.apolloPassport
          = context.apolloPassport || props.apolloPassport;

        /*
        invariant(apolloPassport,
          `Could not find "apolloPassport" in either the context or ` +
          `props of "${connectDisplayName}". ` +
          `Either wrap the root component in an <ApolloPassportProvider>, ` +
          `or explicitly pass "apolloPassport" as a prop to "${connectDisplayName}".`
        )
        */

        if (!apolloPassport) {
          // TODO this can happen with SSR, need to think about this more
          // i.e. can we show the login state?
          this.state = {
            auth: {
              data: {}
            }
          };

          this.actions = {};
          this.apolloPassport = {};

          return;
        }


        this.state = { auth: apolloPassport.getState(), apolloPassport };
        apolloPassport.subscribe(auth => this.setState({ auth, apolloPassport }));
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

    ApolloPassportConnect.propTypes = {
      apolloPassport: PropTypes.instanceOf(ApolloPassport)
    };

    ApolloPassportConnect.contextTypes = {
      apolloPassport: PropTypes.instanceOf(ApolloPassport)
    };

    return ApolloPassportConnect;
  }

}
