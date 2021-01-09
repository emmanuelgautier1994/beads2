<script>
  export let id
  export let x
  export let y
  export let width
  export let height
  import { colorPalette, canvasColors, selectedColorId, history } from './stores.js'

  $: colorId = $canvasColors[id]
  $: color = (colorId !== undefined) ? $colorPalette[colorId] : {h: 0, s: 100, l: 100}
  $: fill = `hsl(${color.h}, ${color.s}%, ${color.l}%)`

  const paint = () => canvasColors.update((oldCanvas) => ({...oldCanvas, [id]: $selectedColorId}))

  const handleClick = () => {
    paint()
    history.commit($canvasColors)
  }
  const handleMouseEnter = (e) => {if(e.buttons === 1) paint()}
</script>

<rect
  {...{id, x, y, width, height, fill}}
  stroke='black' stroke-width='0.1'
  on:click={handleClick}
  on:mouseenter={handleMouseEnter}
/>

<style>
  rect {
    touch-action: none;
  }
</style>