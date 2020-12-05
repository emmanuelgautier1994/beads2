<div class="grid">
  <div class='cell cell-hue-slider'><slot name='hue-slider' /></div>
  <div class='cell cell-sat-slider'><slot name='sat-slider' /></div>
  <div class='cell cell-light-slider'><slot name='light-slider' /></div>
  <div class='cell cell-colors'><slot name='colors' /></div>
  <div class='cell cell-reset-button'><slot name='reset-button' /></div>
</div>

<style>
  .grid{
    display: grid;
    align-items: center;
    justify-content: space-around;
    grid-template-columns: 15em 15em 5em;
    grid-template-rows: 1.5em 1.5em 1.5em;
    grid-template-areas:
      "hue-slider colors reset-button"
      "sat-slider colors reset-button"
      "light-slider colors reset-button";
  }

  .cell-hue-slider { grid-area: hue-slider; }
  .cell-sat-slider { grid-area: sat-slider; }
  .cell-light-slider { grid-area: light-slider; }

  .cell-colors { grid-area: colors; }

  .cell-reset-button { grid-area: reset-button; }
  
</style>