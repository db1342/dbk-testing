"""Scenario: pure additions (no counterpart deletes) between unchanged context.

Whole-line add backgrounds only — no intra-line character spans.
Comment on an added line and on the unchanged lines above/below.
"""


def process(data):
    result = []
    for item in data:
        result.append(item)
    return result
