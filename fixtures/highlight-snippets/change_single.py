def build_url(host, port):
    scheme = "https"
    prefix = scheme + "://" + "www."
    addr = prefix + host + ":" + str(port) + "/api"
    return addr
