<script>
  export let id
  export let x
  export let y
  export let width
  export let height
  import { colorPalette, canvasColors, selectedColorId } from './stores.js'

  $: colorId = $canvasColors[id]
  $: color = (colorId !== undefined) ? $colorPalette[colorId] : {h: 0, s: 100, l: 100}
  $: fill = `hsl(${color.h}, ${color.s}%, ${color.l}%)`
</script>

<rect
  {...{id, x, y, width, height, fill}}
  stroke='black' stroke-width='0.1'
/>

<style>
  rect {
    touch-action: none;
  }
</style>