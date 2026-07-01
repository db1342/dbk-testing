# Deprecated Features

This page lists features that have been removed. It is kept only for historical
reference and will be deleted once all customers have migrated.

## The `acme sync` command

Superseded by `acme run --watch`. The old command polled every 5 seconds and
had no backoff.

## XML output format

The `--format xml` flag is gone. Use `--format json` instead.

## Global mutable config

The `~/.acmerc` global file is no longer read. Configuration is per-project.
