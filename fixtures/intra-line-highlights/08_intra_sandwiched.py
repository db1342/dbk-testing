"""Scenario: intra-line replace sandwiched between a pure delete and a pure add.

Order in the unified hunk is important: deletes, then adds, within a change
range — plus unchanged lines immediately outside.
"""


def pipeline(items):
    total = 0
    for item in items:
        total += item
    average = total / max(len(items), 1)
    count = len(items)
    return total, average, count
