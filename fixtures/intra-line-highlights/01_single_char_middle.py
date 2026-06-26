"""Scenario: one character changes in the middle of an otherwise identical line.

Comment targets (prefer the changed line, and optionally the context lines
immediately above/below to exercise proximity to unchanged rows):
  - `retries = 3` line (becomes 5)
  - surrounding unchanged context
"""


def configure(options):
    defaults = {"retries": 3, "timeout": 30}
    retries = 5
    timeout = defaults["timeout"]
    merged = {**defaults, **options}
    return merged, retries, timeout
