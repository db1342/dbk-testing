# Acme Platform Docs

Welcome to the **Acme** developer documentation. This guide covers setup,
configuration, and day-to-day operation of the platform.

> Looking for the changelog? See [changelog.md](./changelog.md).

## Overview

Acme is a batch-processing platform. It ingests events, runs them through a
pipeline, and emits aggregated results.

| Component | Responsibility        | Language |
| --------- | --------------------- | -------- |
| Ingestor  | Accept incoming data  | Go       |
| Pipeline  | Transform records     | Rust     |
| Emitter   | Publish results       | Python   |

## Installation

Install the CLI with your package manager of choice:

```bash
npm install -g @acme/cli
acme --version
```

## Quick start

1. Authenticate with `acme login`.
2. Create a project with `acme init`.
3. Run the pipeline with `acme run`.

## Support

- Email: support@acme.example
- Chat: `#acme-help`

Thanks for using Acme!
