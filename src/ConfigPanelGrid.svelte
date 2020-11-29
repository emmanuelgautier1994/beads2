<script>
  export let painting
  export let configuring
</script>

<div class="grid" class:painting class:configuring>
  <div class='cell cell-rotate-buttons'><slot name='rotate-buttons' /></div>
  {#if configuring}
    <div class='cell cell-label'><slot name='label' /></div>
    <div class='cell cell-slider'><slot name='slider' /></div>
    <div class='cell cell-go-button'><slot name='go-button' /></div>
  {/if}
</div>

<style>
  .grid{
    display: grid;
    align-content: center;
    justify-content: center;
  }

  .configuring{
    grid-template-columns: 8em 20em 5em;
    grid-template-rows: 2em 2em;
    grid-template-areas:
      "rotate-buttons label go-button"
      "rotate-buttons slider go-button";
  }

  .painting{
    grid-template-areas:
      "rotate-buttons";
  }

  .cell{
    align-self: center;
    justify-self: center;
  }

  .cell-rotate-buttons{
    grid-area: rotate-buttons;
  }

  .cell-label{
    grid-area: label;
  }

  .cell-slider{
    grid-area: slider;
    justify-self: stretch;
  }

  .cell-go-button{
    grid-area: go-button;
  }
  
</style>