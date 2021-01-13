<div class="grid">
  <div class='cell cell-hue-slider'><slot name='hue-slider' /></div>
  <div class='cell cell-sat-slider'><slot name='sat-slider' /></div>
  <div class='cell cell-light-slider'><slot name='light-slider' /></div>
  <div class='cell cell-colors'><slot name='colors' /></div>
  <div class='cell cell-history-buttons'><slot name='history-buttons' /></div>
  <div class='cell cell-reset-button'><slot name='reset-button' /></div>
</div>

<style>
  .grid{
    height: 100%;
    display: grid;
    align-items: center;
    justify-content: space-around;
    grid-template-columns: 3fr 3fr 2.5fr 1fr;
    grid-template-rows: 1fr 1.5em 1.5em 1.5em 1fr;
    grid-template-areas:
      ". colors history-buttons reset-button"
      "hue-slider colors history-buttons reset-button"
      "sat-slider colors history-buttons reset-button"
      "light-slider colors history-buttons reset-button"
      ". colors history-buttons reset-button";
  }

  .cell-hue-slider { grid-area: hue-slider; }
  .cell-sat-slider { grid-area: sat-slider; }
  .cell-light-slider { grid-area: light-slider; }

  .cell-colors { grid-area: colors; }

  .cell-history-buttons { grid-area: history-buttons; place-self: center stretch;}
  .cell-reset-button { grid-area: reset-button; place-self: stretch stretch; }
  
</style>