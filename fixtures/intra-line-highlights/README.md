# Intra-line highlight rendering fixtures

Disposable fixtures for exercising Cursor Review / Graphite PR UI intra-line
highlights in the Changes tab, Activity timeline snippets, and the comment
sidebar.

Each module is a self-contained scenario. Prefer leaving comments on the lines
called out in the module docstring (or on nearby context) so snippets exercise
single-line vs multi-line context windows (sidebar uses `previousContextRows=0`).

| File | What to verify |
| --- | --- |
| `01_single_char_middle.py` | Tiny island highlight on `3`→`5`; unchanged neighbors stay neutral |
| `02_prefix_and_suffix.py` | Prefix (`http`→`https`) and suffix (`/v1`→`/v2`) partial highlights |
| `03_multi_span_one_line.py` | Multiple non-contiguous spans on one long line |
| `04_replace_block_1x1.py` | 1×1 replace; sidebar single-line still highlights vs unrendered peer |
| `05_replace_block_multi.py` | Multi-line paired deletes/adds with partial overlaps |
| `06_pure_add_near_context.py` | Whole-line adds only (no char spans) next to unchanged context |
| `07_pure_delete_near_context.py` | Whole-line deletes only; LEFT-side comments |
| `08_intra_sandwiched.py` | Delete + intra-line replace + add in one change range |
| `09_whitespace_and_indent.py` | Whitespace / indent-only (may depend on trim settings) |
| `10_long_line_small_edit.py` | Small edit far into a long line (`tail=ok`→`tail=done`) |
| `11_adjacent_replace_blocks.py` | Two replace blocks separated by unchanged; no highlight bleed |
| `12_whole_line_rewrite.py` | Near-total rewrite still treated as paired replace |
| `13_mixed_language.ts` | TS syntax colors + intra-line (`retries`, field rename, greet) |
