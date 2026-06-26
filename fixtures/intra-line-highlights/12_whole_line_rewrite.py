"""Scenario: line is completely rewritten (little or no shared character runs).

Expect full-line (or near-full) highlights on both sides, still typed as a
replace rather than independent pure add/delete when paired.
"""


def compute(n):
    result = n * n
    return result
