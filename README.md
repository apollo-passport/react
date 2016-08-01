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
import { apolloPassport } from '../../../lib/apollo';

const SomewhereInMyApp = () => (
  <LoginButtons apolloPassport={apolloPassport} />
);
```

That's it!

## TODO

* Ability to directly show a specific login form

## Custom CSS

Override as desired.  We'd love contributions for different frameworks (bootstrap, material-ui), etc.  Our preference is for you to simply provide alternative CSS with the existing structure, as that is a lot more maintainable.  But you can create a new package using your own structure if desired.

## Credits

Most of the markup (and of course the Meteor theme) was directly copied from the Meteor Accounts system, from which the entire Apollo Passport project draws most of it's inspiration.  Meteor is Copyrighted by the Meteor Development Group (MDG) who have likewise licensed the code under the same MIT license that we use.
