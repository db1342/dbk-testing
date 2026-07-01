# Ideas

Slightly-less-random working notes.

## TODO

- [x] Draft the API reference
- [x] Write the deployment guide
- [x] Add mermaid diagrams somewhere
- [ ] Write a tuning cookbook

## Open questions

- Should regions be a first-class concept or a tag? *(leaning first-class)*
- What is the right default batch size?

## Snippet dump

```python
def chunk(items, size):
    for i in range(0, len(items), size):
        yield items[i : i + size]
```
