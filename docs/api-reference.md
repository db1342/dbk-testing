# API Reference

This document describes the public HTTP API. All endpoints are rooted at
`https://api.acme.example/v1`.

## Authentication

Send a bearer token in the `Authorization` header:

```http
Authorization: Bearer <token>
```

Tokens are issued by `POST /auth/token` and expire after one hour.

## Projects

### `GET /projects`

List all projects visible to the caller.

Query parameters:

- `limit` — page size, default `20`, max `100`.
- `cursor` — opaque pagination cursor.

### `POST /projects`

Create a new project.

```json
{
  "name": "my-project",
  "region": "us-east-1"
}
```

### `DELETE /projects/{id}`

Permanently delete a project and all of its data.

## Pipelines

### `POST /projects/{id}/runs`

Start a new pipeline run.

### `GET /projects/{id}/runs/{runId}`

Fetch the status of a run.

## Rate limits

All endpoints are limited to 600 requests per minute per token. Exceeding the
limit returns `429 Too Many Requests` with a `Retry-After` header.

## Errors

Errors use standard HTTP status codes and return a JSON body:

```json
{
  "error": "not_found",
  "message": "project does not exist"
}
```
