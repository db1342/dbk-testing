def build_url(host, port):
    scheme = "http"
    prefix = scheme + "://"
    addr = prefix + host + ":" + str(port)
    return addr
