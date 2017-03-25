# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

# [Unreleased][]

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

[Unreleased]: https://github.com/ackerdev/objection-softdelete/compare/v1.0.1...HEAD
[1.0.1]: https://github.com/ackerdev/objection-softdelete/compare/v1.0.0...v1.0.1
