"""Scenario: whitespace-only and indentation-only intra-line changes.

Depending on ignore-trim-whitespace settings, highlights may be suppressed or
subtle. Comment on both lines.
"""


def spaced(a, b):
    return a + b


def indented():
    return 1
