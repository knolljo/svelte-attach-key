# svelte-attach-key

Add hotkeys to svelte components.

**Example**

```svelte
<script lang="ts">
  import { hotkey } from "svelte-attach-key";
</script>

<button {@attach hotkey('k')} onclick={doSomething}>Press K</button>

<button {@attach hotkey('s', { ctrl: true })} onclick={save}>Save (Ctrl+S)</button>

<input {@attach hotkey('Enter', { global: false })} />
```

For a more advanced example look at the [playground](/playground/src/routes/+page.svelte).
