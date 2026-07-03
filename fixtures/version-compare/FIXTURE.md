# Version / commit compare fixture

PR: https://github.com/db1342/dbk-testing/pull/17
Base branch: `version-compare-trunk` (not `main` — `main` is protected)
Feature branch: `version-compare-pr`

Built with `gt` so Graphite records versions on each submit.

## Timeline

| Step | What | Graphite version intent |
| --- | --- | --- |
| M0 | Trunk: `shared.txt` with `SHARED_BASE` | Branch point |
| V1 | PR: `feature-only.txt`, `FEATURE_EDIT` on shared, `feature-mid.txt` | First submit (base = M0) |
| M1 | Trunk: `mainline-only.txt` | Mainline-only file |
| M2 | Trunk: `MAINLINE_EDIT` on shared (conflicts with V1) | Moves base |
| V2 | Restack PR onto trunk; resolve conflict keeping both edits + `CONFLICT_RESOLUTION` | Second submit (base = M2, **different base**) |
| V3 | Add `scratch.txt` | Third submit |
| V4 | Remove `scratch.txt` | Fourth submit (revert between versions) |

## Markers

- `FEATURE_ONLY_V1` — PR-only, never on trunk
- `FEATURE_MID` — second commit on V1 (commit-range middle)
- `FEATURE_EDIT` — PR edit to shared
- `MAINLINE_EDIT` — trunk edit to shared after V1
- `MAINLINE_ONLY` — trunk-only file after V1
- `CONFLICT_RESOLUTION` — explicit conflict-resolution marker in V2
- `SCRATCH` — added V3, removed V4
