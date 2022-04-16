<script lang="ts">
  import yaml from "js-yaml"

  import type { RawNode } from "./lib/normalize"
  import { normalize } from "./lib/normalize"

  let data: RawNode[] = yaml.load(`
    - name: Root
      children:
        - name: Child 1
          children: "I'm a single child"
        - Child 2
        - name: Child 3
          children:
            - Grandchild 1
            - Grandchild 2
            - Grandchild 3
  `)

  $: normalizedData = normalize(data)

  console.log({ data, normalizedData })
</script>

<main>
  <h1>Doml</h1>
  <p>Render Yaml as DOM</p>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 700;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }

  p {
    max-width: 14rem;
    margin: 1rem auto;
    line-height: 1.35;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }

    p {
      max-width: none;
    }
  }
</style>
