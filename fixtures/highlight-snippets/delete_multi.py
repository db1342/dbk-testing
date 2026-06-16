def connect(settings):
    client = Client()
    deprecated_retry = settings.get("retry", 5)
    deprecated_backoff = settings.get("backoff", 2)
    deprecated_jitter = settings.get("jitter", True)
    client.open()
    return client
