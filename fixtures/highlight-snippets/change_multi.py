def format_money(amount, currency):
    symbol = "$"
    rounded = round(amount, 2)
    label = symbol + str(rounded)
    return label
