---
title: Scaling the Pipeline
author: Dana Rivera
date: 2026-06-28
draft: false
tags:
  - performance
  - pipeline
  - tuning
reviewers:
  - alex
  - sam
  - dana
---

# Scaling the Pipeline

When throughput matters, the pipeline can be tuned along three axes: batch
size, parallelism, and backpressure. This post walks through each in turn.

## Batch size

Larger batches amortize per-request overhead but increase tail latency. Start
at 500 and adjust based on your `p99`.

## Parallelism

Set `ACME_WORKERS` to the number of CPU cores available. Going beyond that
rarely helps and often hurts due to contention.

## Backpressure

When downstream consumers fall behind, enable `ACME_BACKPRESSURE=1` so the
ingestor slows down instead of dropping records.
