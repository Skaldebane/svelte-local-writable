# svelte-local-writable
Svelte-compatible writable store that persists to local storage.

This package provides `LocalWritable`, a custom implementation of Svelte's `Writable` interface, that saves the value of the writable in `localStorage`.

> **SvelteKit** (SSR) is also supported.

## Usage
A `LocalWritable` can be obtained by calling the `localWritable` function, passing in the key (that's used in `localStorage`) and a default value.
```ts
// stores.ts
export const counter = localWritable("counter", 0);
```
> [!note]
> The default value is only used if the key doesn't exist in `localStorage`.

`LocalWritable` instances can be observed from Svelte code using the `$` prefix, just like normal writable stores:

```svelte
<!-- +page.svelte -->
<script>
    import { counter } from "./stores"; 
</script>

<button on:click={() => $counter++}>Press to increment {$counter}</button>
```
