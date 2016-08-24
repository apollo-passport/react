# Contributing to apollo-passport-react

See https://github.com/apollo-passport/apollo-passport/blob/master/CONTRIBUTING.md.  There is important information there relevant to all apollo-passport projects.

## React specific guidelines

* [react-storybook](https://github.com/kadirahq/react-storybook) - would love for us to be using this.

* **Redux** - we intentionally don't use it to avoid requiring it as a dependency, but willing to reconsider if this ends up significantly detracting from project cleanliness.

* **Design** - where possible, use functional stateless components that receive data from a higher order component (not necessarily with the most common patterns for this).
