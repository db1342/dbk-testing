"""Scenario: two separate replace blocks separated by unchanged context.

Each block should get its own intra-line pairing; comments on either block or
the middle unchanged line should not bleed highlights across blocks.
"""


def first_block(x):
    value = x + 2
    return value


def middle_unchanged(y):
    return y * 2


def second_block(z):
    value = z - 3
    return value
