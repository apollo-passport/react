# Change Log
All notable changes to this project will be documented in this file.
This project will adhere to [Semantic Versioning](http://semver.org/) from v1.0.0+.
We use the format from [keepachangelog.com](keepachangelog.com).

## [Unreleased]

## [v0.0.3]
### Added
* `Provider-` and `connect-` style functions to make auth data accessible to
  components when Redux is not used.  Note, `connect` also accepts an
  `apolloPassport` prop for use when not inside of the `Provider`.

### Changed
* `LoginButtons` now uses the `connect` function added in this release.
* `LoginButtons` now defaults to showing the new `displayName` data vs
  userId, if it's available.

### Fixed
* `LogginedInButtons` proptype warning.

## [v0.0.2]
### Fixed
* We no longer break when loading on the server (i.e. for SSR)
* Services iterator now correctly uses a `key` attribute for each service.
* Fix quotes for loginEmailPassword icon.
* Add missing `id="login-dropdown-list"` - fixes alignment issues.
* Fix dialog not closing on logout.
* Dialog now auto-closes on successful login.

## [v0.0.1]

Super early (unfinished) release for early birds.

[Unreleased]: https://github.com/apollo-passport/react/compare/master...devel
[v0.0.3]: https://github.com/apollo-passport/react/compare/v0.0.2...v0.0.3
[v0.0.2]: https://github.com/apollo-passport/react/compare/v0.0.1...v0.0.2
