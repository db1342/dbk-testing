---
title: Scaling the Pipeline
author: Dana Rivera
date: 2026-04-02
draft: true
tags:
  - performance
  - pipeline
reviewers:
  - alex
  - sam
---

# Scaling the Pipeline

When throughput matters, the pipeline can be tuned along three axes: batch
size, parallelism, and backpressure.

## Batch size

Larger batches amortize per-request overhead but increase tail latency. Start
at 500 and adjust based on your `p99`.

## Parallelism

Set `ACME_WORKERS` to the number of CPU cores available. Going beyond that
rarely helps and often hurts due to contention.
