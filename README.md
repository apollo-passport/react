# apollo-passport-react

React UI for apollo-passport.

Copyright (c) 2016 by Gadi Cohen, released under the MIT license.

## Usage

Install [apollo-passport](https://www.npmjs.com/package/apollo-passport).

Install and setup this package:

```sh
$ npm i --save apollo-passport-react
```

```js
import { LoginButtons } from 'apollo-passport-react';
import 'apollo-passport-react/style/meteor.less';

// Wherever you export your apolloPassport instance from...
// Note, not necessary if using "Option 2" (ApolloPassportProvider) below.
import { apolloPassport } from '../../../lib/apollo';

// apolloPassport prop can be ommitted when using "Option 2" below.
const SomewhereInMyApp = () => (
  <LoginButtons apolloPassport={apolloPassport} />
);
```

That's it!

## Getting auth property in other components

### Option 1: With Redux (recommended if you use Redux)

If you use Redux, this is the recommended method.  **You need to have setup `apollo-passport` to use Redux too (see the README there)**.  Example, pass `userId` as a prop to your component.

```js
import { connect } from 'react-redux';

const MyComponent = () => ( <div>etc</div> );

const MyComponentWithData = connect(
  ({ auth }) => ({ userId: auth.data.userId })
)(MyComponent);
```

### Option 2: Without Redux (your only choice if you don't use Redux)

If you don't use Redux, you need to wrap your main app with an `ApolloPassportProvider` [just like with apollo-react](http://dev.apollodata.com/react/initialization.html#creating-provider).

**Step 1**: Use `ApolloPassportProvider` near the root of your tree (done for you already when using the Meteor integration):

```js
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import ApolloPassportProvider from 'apollo-passport-react';

// Wherever you export your apolloPassport instance from...
// Note, not necessary if using "Option 2" (ApolloPassportProvider) below.
import { apolloPassport } from '../../../lib/apollo';

const client = new ApolloClient();

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloPassportProvider apolloPassport={apolloPassport}>
      <MyRootComponent />
    </ApolloPassportProvider>
  </ApolloProvider>,
  rootEl
);
```

**Step 2**: to get the `auth` state, or parts of it, use the connect-like function from the library:

```js
import apConnect from 'apollo-passport-react/lib/connect';

const MyComponent = () => ( <div>etc</div> );

const MyComponentWithData = apConnect(
  ({ auth }) => ({ userId: auth.data.userId })
)(MyComponent);
```

Note: although it seems superfluous to provide an `{ auth: { ...data } }` formed object, when it's obvious you want `auth`, we purposefully retain the same format you'd get from a Redux state store, to make it easy to switch between both options.

## Get Involved!

Hopefully you saw the IN DEVELOPMENT section of the `apollo-passport` README.

[Open issues sorted by thumbs-up](https://github.com/apollo-passport/react/issues?q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc).

Out of all of the apollo-passport-xxx packages, this is the least developed.  I'd love for someone else to be lead-maintaner for this package.  See also [open issues](https://github.com/apollo-passport/react/issues) (especially those marked as help-wanted) to see how you can help!  And the [CONTRIBUTING.md](CONTRIBUTING.md) file for design guidelines.

## Custom CSS

Override as desired.  We'd love contributions for different frameworks (bootstrap, material-ui), etc.  Our preference is for you to simply provide alternative CSS with the existing structure, as that is a lot more maintainable.  But you can create a new package using your own structure if desired.

## Credits

Most of the markup (and of course the Meteor theme) was directly copied from the Meteor Accounts system, from which the entire Apollo Passport project draws most of it's inspiration.  Meteor is Copyrighted by the Meteor Development Group (MDG) who have likewise licensed the code under the same MIT license that we use.
