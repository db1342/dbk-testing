def render(template, context):
    output = template
    for key, value in context.items():
        output = output.replace("{" + key + "}", str(value))
    return output
