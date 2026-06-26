"""Scenario: prefix-only and suffix-only intra-line edits on adjacent lines.

Comment on either changed line; both should show partial (not full-line) highlights.
"""


def build_url(host, port):
    scheme = "https"
    prefix = scheme + "://" + "www."
    path = "/v2/items"
    addr = prefix + host + ":" + str(port) + path
    return addr
