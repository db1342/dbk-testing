def render(template, context):
    output = template
    missing = [k for k in find_keys(template) if k not in context]
    if missing:
        raise KeyError("missing context keys: " + ", ".join(missing))
    for default_key, default_value in DEFAULTS.items():
        context.setdefault(default_key, default_value)
    for key, value in context.items():
        output = output.replace("{" + key + "}", str(value))
    return output
