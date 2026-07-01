# Getting Started

This walkthrough takes you from zero to a running pipeline in about ten
minutes.

## Prerequisites

- Node.js 20+
- An Acme account ([sign up](https://acme.example/signup))
- A terminal you're comfortable with

## 1. Install the CLI

```bash
npm install -g @acme/cli
acme --version
```

You should see output like `acme/1.2.0`.

## 2. Authenticate

```bash
acme login
```

This opens a browser window. Approve the request and return to your terminal.

## 3. Create your first project

```bash
acme init my-first-project
cd my-first-project
```

The generated layout looks like this:

```
my-first-project/
├── acme.toml       # project configuration
├── pipeline/       # your transforms
└── fixtures/       # sample input
```

## 4. Run it

```bash
acme run --watch
```

| Flag        | Meaning                              |
| ----------- | ------------------------------------ |
| `--watch`   | Re-run when files change             |
| `--dry-run` | Validate config without executing    |
| `--verbose` | Print per-record timing              |

## Next steps

- [ ] Read the [API reference](./api-reference.md)
- [ ] Skim the [deployment guide](./guides/deployment.md)
- [ ] Join `#acme-help` and say hi

> **Tip:** run `acme doctor` any time something feels off — it checks your
> config, credentials, and network in one shot.
