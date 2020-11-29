<div class="cell">
    <slot />
</div>

<style>
  .cell{
    grid-area: workspace;
    justify-self: stretch;
  }

  .container{
    height: 80%;
    flex: 0 0 auto;
  }
</style>