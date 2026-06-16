def configure(options):
    defaults = {"retries": 3, "timeout": 30}
    legacy_mode = options.get("legacy", False)
    legacy_buffer = options.get("buffer", 1024)
    legacy_path = options.get("path", "/tmp")
    merged = {**defaults, **options}
    return merged
