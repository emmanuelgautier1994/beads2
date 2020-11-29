<script>
  export let id
  export let x
  export let y
  export let width
  export let height

  let fill = 'white'

  $: if(id < 25) fill = 'red'
  $: if(id > 25) fill = 'blue'
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