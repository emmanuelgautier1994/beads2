<script>
  export let id
  export let x
  export let y
  export let width
  export let height
  import { colorPalette, canvasColors, selectedColorId } from './stores.js'

  let selectId
  selectedColorId.subscribe((value) => {
    if(id === 3) console.log("salut")
  })

  colorPalette.subscribe((value) => {
    if(id === 3) console.log(value)
  })

  $: colorId = $canvasColors[id]
  $: color = (colorId !== undefined) ? $colorPalette[colorId] : {h: 0, s: 100, l: 100}
  $: fill = `hsl(${color.h}, ${color.s}%, ${color.l}%)`
  // let fill = 'white'
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