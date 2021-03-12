# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [3.0.0][] - 2020-03-11
### Fixed
- Fixed delete updating records that were already soft-deleted

## [2.0.1][] - 2018-12-31
### Fixed
- Fixed delete filter on relatedQuery with alias

## [2.0.0][] - 2018-04-02
### Fixed
- Replaced deprecated `isFindQuery()` with `isFind()` for Objection 1.0

## [1.0.1][] - 2017-03-24
### Fixed
- Ambiguous column error during joins

## 1.0.0 - 2017-03-20
### Added
- `register` function to wire up an Objection.js instance
- Override delete queries to update delete attribute
- Omit deleted records from query results
- Allow override to include deleted records in query results
- Allow override to force delete of soft-delete models

[Unreleased]: https://github.com/ackerdev/objection-softdelete/compare/v3.0.0...HEAD
[1.0.1]: https://github.com/ackerdev/objection-softdelete/compare/v1.0.0...v1.0.1
[2.0.0]: https://github.com/ackerdev/objection-softdelete/compare/v1.0.1...v2.0.0
[2.0.1]: https://github.com/ackerdev/objection-softdelete/compare/v2.0.0...v2.0.1
[3.0.0]: https://github.com/ackerdev/objection-softdelete/compare/v2.0.1...v3.0.0
