def configure(options):
    defaults = {"retries": 3, "timeout": 30}
    merged = {**defaults, **options}
    return merged
