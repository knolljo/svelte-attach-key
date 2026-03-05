# svelte-attach-key

A Svelte attachment for binding keyboard shortcuts to elements using the [Svelte 5 attachments API](https://svelte.dev/docs/svelte/attachments).

Triggers the element's `.click()` when the shortcut is pressed. Listens globally on `window` by default.

## Installation

```
npm install svelte-attach-key
```

## Example

```svelte
<script lang="ts">
  import { hotkey } from "svelte-attach-key";
</script>

<!-- Trigger on single key -->
<button {@attach hotkey('k')} onclick={doSomething}>Press K</button>

<!-- With modifier keys -->
<button {@attach hotkey('s', { ctrl: true })} onclick={save}>Save (Ctrl+S)</button>

<!-- Platform-aware modifier (Ctrl on Windows/Linux, Cmd on Mac) -->
<button {@attach hotkey('s', { mod: true })} onclick={save}>Save</button>

<!-- Scoped to element focus only -->
<input {@attach hotkey('Enter', { global: false })} />

<!-- Conditionally enabled -->
<button {@attach enabled && hotkey('k')} onclick={doSomething}>Press K</button>
```

[Demo](https://joknoll.github.io/svelte-attach-key/) | [npm](https://www.npmjs.com/package/svelte-attach-key)

## API

### `hotkey(key, options?)`

Svelte attachment that triggers the element's `.click()` on the specified keyboard shortcut.

| Option             | Type      | Default | Description                                                   |
|--------------------|-----------|---------|---------------------------------------------------------------|
| `ctrl`             | `boolean` | `false` | Require Ctrl key                                              |
| `shift`            | `boolean` | `false` | Require Shift key                                             |
| `alt`              | `boolean` | `false` | Require Alt key                                               |
| `meta`             | `boolean` | `false` | Require Meta key (Cmd on Mac)                                 |
| `mod`              | `boolean` | `false` | Platform-aware: Ctrl on Windows/Linux, Cmd on Mac             |
| `global`           | `boolean` | `true`  | Listen on `window`; `false` to scope to element focus         |
| `preventDefault`   | `boolean` | `true`  | Call `e.preventDefault()` on match                            |
| `stopPropagation`  | `boolean` | `false` | Call `e.stopPropagation()` on match                           |
| `ignoreInputs`     | `boolean` | `true`  | Skip when event originates from inputs or contenteditable     |
| `code`             | `boolean` | `false` | Match `e.code` instead of `e.key` (physical key layout)       |
| `enabled`          | `boolean` | `true`  | Whether the attachment is active                              |
