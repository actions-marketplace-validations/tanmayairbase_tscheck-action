# TS Check action

Check for counts of `@ts-nocheck` in your code repo

## Getting Started

* Add a new GitHub Action workflow:
```
name: TS Check

on:
  pull_request

jobs:
  thanks:
    runs-on: ubuntu-latest
    steps:
      - uses: tanmayairbase/tscheck-action@main
        with:
          TSNOCHECK_COUNT: ${{secrets.TSNOCHECK_COUNT}}
```
* You're welcome!
