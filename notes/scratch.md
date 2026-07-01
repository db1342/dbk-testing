# Scratch Notes

Random working notes. Not polished.

## TODO

- [x] Draft the API reference
- [ ] Write the deployment guide
- [ ] Add mermaid diagrams somewhere

## Open questions

- Should regions be a first-class concept or a tag?
- What is the right default batch size?

## Snippet dump

```python
def chunk(items, size):
    for i in range(0, len(items), size):
        yield items[i : i + size]
```
