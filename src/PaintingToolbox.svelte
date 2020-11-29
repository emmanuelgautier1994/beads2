<script>
  export let toggleStep
</script>

<div class="cell">
  painting toolbox
  <button on:click={toggleStep}>Reset</button>
</div>

<style>
  .cell{
    grid-area: painting-toolbox;
    align-self: center;
    text-align: center;
  }
</style>