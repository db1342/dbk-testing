"""Scenario: several non-contiguous character spans change on a single line.

The long assignment should highlight multiple islands rather than the whole line.
"""


def format_label(user_id, role, active):
    # Keep this line long so multi-span highlights are easy to see in the UI.
    label = "uid=" + str(user_id) + " role=" + role.upper() + " on=" + str(active)
    return label
