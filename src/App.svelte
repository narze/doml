<script lang="ts">
  import yaml from "js-yaml"
  import DataNodes from "./DataNodes.svelte"

  import type { RawNode } from "./lib/normalize"
  import { normalize } from "./lib/normalize"

  const defaultData = `# Sample Data
- name: Root
  children:
    - name: Child 1
      children: "I'm a single child"
    - Child 2
    - n: Child 3
      c:
        - Grandchild 1
        - Grandchild 2
        - Grandchild 3
    - children: [1,2,3]`

  let yamlData = window.localStorage.getItem("domlData") || defaultData
  let data, normalizedData, error

  $: try {
    data = yaml.load(yamlData) as RawNode[]
    window.localStorage.setItem("domlData", yamlData)
    error = null
  } catch (e) {
    console.log(e)
    error = e.message
  }

  $: if (data) {
    normalizedData = normalize(data)
  }

  console.log({ data, normalizedData })
</script>

<main>
  <h1>Doml</h1>
  <p>Render Yaml as DOM</p>

  <div class="container mx-auto grid grid-cols-2 gap-4">
    <textarea class="font-mono p-4 border rounded" bind:value={yamlData} />
    <div class="-mt-2">
      {#if error}
        <div
          class="bg-red-500 text-white p-2 m-2 rounded text-left text-xs font-mono"
        >
          {@html error.replaceAll("\n", "<br>")}
        </div>
      {/if}
      <DataNodes nodes={normalizedData} />
    </div>
  </div>
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
