<script lang="ts">
  import type { NormalizedNode } from "./lib/normalize"

  export let nodes: NormalizedNode[]
</script>

{#each nodes as node}
  <div class="m-2 p-2 px-3 border rounded text-left">
    {node.name ?? ""}

    {#if node.children}
      <svelte:self nodes={node.children} />
    {/if}
  </div>
{/each}
