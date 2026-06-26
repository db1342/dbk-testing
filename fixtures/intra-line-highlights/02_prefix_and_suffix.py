"""Scenario: prefix-only and suffix-only intra-line edits on adjacent lines.

Comment on either changed line; both should show partial (not full-line) highlights.
"""


def build_url(host, port):
    scheme = "http"
    prefix = scheme + "://" + "www."
    path = "/v1/items"
    addr = prefix + host + ":" + str(port) + path
    return addr
