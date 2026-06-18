def process(data):
    result = []
    if data is None:
        raise ValueError("data must not be None")
    if not isinstance(data, list):
        raise TypeError("data must be a list")
    for item in data:
        result.append(item)
    return result
