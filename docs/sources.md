# Source artifact inventory

The library publishes four authored study pages. Their text, source qualifications, diagrams and interactive scripts come from the neighboring `philosopher-output` folder. The original files remain unchanged. The build adds navigation and responsive styling to the published distribution.

| Original file | SHA-256 |
| --- | --- |
| `lecture2-efficient-ai.html` | `e6e42c957885c8b064c9d1b08803472d8a40d51dd21bcff2de1d2e9d4511d4c2` |
| `lecture3-efficient-ai-deep.html` | `d2bdcd7e3bbd3f0c753ec7cad48397d54acea4a75b8b4ee3f70aebb3f7d44ee9` |
| `neural-network-building-blocks.html` | `361a1ea1b132fd5ca3bf26278083b8d8ff821699dc392086789616900dd66e96` |
| `neural-network-pruning.html` | `d40cd240c176d10b62d9d21a3b022fd2edbbc020a178542acc231e2631bfb5c4` |

The referenced course slide decks are included as `Lecture2.pdf` through `Lecture6.pdf`. The study pages retain their instructor and paper attributions.

## Refreshing the collection

From this repository, run `python3 scripts/import-artifacts.py` while the neighboring `philosopher-output` folder and lecture PDFs are available. The importer copies source pages and slide files and rebuilds `src/data/artifacts.json`. It uses only the Python standard library.

The importer has an explicit reading-order list. To add a page, extend `ORDER` with its filename, short library title, reading context, kind, lecture label and description. `Interactive` is the kind used by the With labs filter. Titles, sections, search text and reading times are generated from each original HTML page. Then run `npm run build` and review the new reader and links before pushing.

Browser bookmarks stay in local browser storage; the site does not create accounts or synchronize notes between visitors.
