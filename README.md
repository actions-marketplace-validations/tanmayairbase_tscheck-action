# No more `@ts-nocheck`

Counts the number of @ts-nocheck occrrences in code and limits them

## Getting Started
* Accepts a single param, `TSNOCHECK_COUNT`, for the number of `@ts-nocheck`s you want to keep in your repository (optional, defaults to `0`)
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
