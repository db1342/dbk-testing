"""Scenario: multi-line replace — several deletes followed by several adds.

Intra-line highlights should pair corresponding lines; comment on any line in
the block and on the unchanged lines that bracket it.
"""


def render_template(template, context):
    output = template
    for key, value in context.items():
        token = "{{" + key + "}}"
        output = output.replace(token, repr(value))
    missing = []
    for key in find_keys(template):
        if key not in context:
            missing.append(key)
    if missing:
        raise KeyError("missing keys: " + ", ".join(missing))
    return output


def find_keys(template):
    return []
