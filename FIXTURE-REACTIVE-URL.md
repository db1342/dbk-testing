# Reactive Changes URL fixture

Use this PR in **Cursor Review / Graphite** to verify that a **reactively pinned**
version (new commit arrives while you stay on an older tip) does **not** rewrite
a clean `/…/changes` URL, so a browser refresh still loads the full-branch diff.

## Baseline

Branch `reactive-changes-url-fixture` is stacked on several commits past `main`
(each push typically becomes a new PR **version** once synced). Open this PR in
Review and land on the Changes tab with **no** `compare_versions` /
`compare_commits` query params.

## Manual test (everysphere fix)

1. Open this PR → **Changes** with a bare `…/changes` URL (no comparison query).
2. Leave that tab open; confirm you are on the full-branch / latest view.
3. From this worktree, push **another** commit (see below) so Review learns a
   new version via stream/sync.
4. **Expect (with fix):** address bar stays without `compare_*`; UI may show
   outdated / not-latest affordances; **hard refresh** loads full branch again.
5. **Regression without fix:** URL gains something like `compare_versions=base..N`
   and refresh stays on the pinned range.

Also try: deliberately pick a version in the selector → URL **should** gain
`compare_*` and survive refresh; **Show all / latest** should clear it.

## Add another version (while Review stays open)

From this worktree (branch `reactive-changes-url-fixture`):

```bash
./scripts/push-next-fixture-version.sh
# or with a note:
./scripts/push-next-fixture-version.sh "tweak pricing hero"
```

That appends a line to `fixture-versions.log`, commits, and pushes `origin`.
Repeat as needed for multi-push SSE / multi-version scenarios.

One-off without the script:

```bash
echo "version $(date -u +%Y-%m-%dT%H:%M:%SZ)" >> fixture-versions.log
git add fixture-versions.log
git commit -m "fixture: another version for reactive URL test"
git push
```
