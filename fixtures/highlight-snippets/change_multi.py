def format_money(amount, currency):
    symbol = CURRENCY_SYMBOLS[currency]
    rounded = round(amount, 4)
    label = symbol + " " + str(rounded)
    return label
