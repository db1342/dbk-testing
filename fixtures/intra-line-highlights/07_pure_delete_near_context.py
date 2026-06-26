"""Scenario: pure deletions (no counterpart adds) between unchanged context.

Whole-line delete backgrounds only. Comment on a deleted line (LEFT side) and
on the unchanged survivors around the hole.
"""


def connect(settings):
    client = Client(settings)
    legacy_mode = settings.get("legacy", False)
    legacy_buffer = settings.get("buffer", 1024)
    legacy_path = settings.get("path", "/tmp")
    client.open()
    return client


class Client:
    def __init__(self, settings):
        self.settings = settings

    def open(self):
        pass
