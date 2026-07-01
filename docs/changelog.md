# Changelog

All notable changes to this project are documented here. This project adheres
to [Semantic Versioning](https://semver.org/).

## [1.3.0] - 2026-07-01

### Added

- Rendered markdown preview toggle in the PR diff view.
- `acme deploy rollback` command.

### Changed

- `acme run` now streams progress by default.

### Fixed

- Frontmatter no longer renders as a giant heading in previews.

## [1.2.0] - 2026-05-01

### Added

- Support for regional endpoints.
- `acme doctor` command for diagnosing config issues.

### Fixed

- Retry loop no longer spins on 401 responses.

## [1.1.0] - 2026-03-14

### Added

- Parallel pipeline execution.

### Changed

- Default batch size increased from 100 to 500.

## [1.0.0] - 2026-01-09

Initial public release.
