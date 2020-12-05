<script>
  import PaintingToolboxGrid from './PaintingToolboxGrid.svelte'
  export let toggleStep

  let selectedColorId = 1

  let colors = [
    {h: 0, s:100, l:100, id: 1},
    {h: 50, s:100, l:70, id: 2},
    {h: 100, s:100, l:70, id: 3},
    {h: 150, s:100, l:70, id: 4},
    {h: 200, s:100, l:70, id: 5},
    {h: 250, s:100, l:70, id: 6},
    {h: 300, s:100, l:70, id: 7},
    {h: 350, s:100, l:70, id: 8},
    {h: 0, s:100, l:70, id: 9},
    {h: 0, s:100, l:50, id: 10},
    {h: 0, s:100, l:30, id: 11},
    {h: 0, s:100, l:10, id: 12}
  ]

  $: selectedColor = colors[selectedColorId-1]
</script>

<div class="cell">
  <PaintingToolboxGrid>
    <input
      slot='hue-slider'
      type='range' class='hue-gradient'
      min=0 max=360 step=1
      bind:value={colors[selectedColorId-1].h}
    />
    <input
      slot='sat-slider' type='range'
      min=0 max=100 step=1
      class='sat-gradient' style="--h:{selectedColor.h}; --l:{selectedColor.l}%"
      bind:value={colors[selectedColorId-1].s}
    />
    <input
      slot='light-slider' type='range'
      min=0 max=100 step=1
      class='light-gradient' style="--h:{selectedColor.h}; --s:{selectedColor.s}%"
      bind:value={colors[selectedColorId-1].l}
    />
    <div slot='colors' class='colors-grid'>
      {#each colors as color (color.id)}
        <div
          class:selected={color.id == selectedColorId}
          class:blank={color.l == 100}
          class='color'
          style="--h:{color.h}; --s:{color.s}%; --l:{color.l}%"
          on:click={() => selectedColorId = color.id}
        />
      {/each}
    </div>
    <button on:click={toggleStep} slot="reset-button" class='reset-button'>X</button>
  </PaintingToolboxGrid>
</div>

<style>
  .cell{
    grid-area: painting-toolbox;
    align-self: center;
    text-align: center;
  }

  input{
    -webkit-appearance: none;
    width: 90%;
    height: 0.8em;
    border-radius: 0.2em;
    cursor: pointer;
  }

  input::-webkit-slider-thumb{
    -webkit-appearance: none;
    height: 1.2em;
    width: 1.2em;
    border-radius: 1.2em;
    border: none;
    background: grey;
    cursor: pointer;
    box-shadow: 0 0 0.2em rgba(0,0,0,0.4);
  }

  input:focus{
    outline: none;
  }

  .hue-gradient {
    background: linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 17%, rgb(0, 255, 0) 33%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 67%, rgb(255, 0, 255) 83%, rgb(255, 0, 0) 100%);
  }

  .sat-gradient {
    background: linear-gradient(to right, hsl(var(--h), 0%, var(--l)), hsl(var(--h), 100%, var(--l)));
  }

  .light-gradient {
    background: linear-gradient(to right, hsl(var(--h), var(--s), 0%), hsl(var(--h), var(--s), 50%), hsl(var(--h), var(--s), 100%));
  }

  .colors-grid{
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: 2em 2em 2em 2em 2em 2em;
    grid-template-rows: 2em 2em;
  }

  .selected{
    transform: scale(1.5);
    filter: drop-shadow(0 0 0.2em rgba(0,0,0,0.2));
    border-radius: 0.4em;
  }

  .color{
    height: 1.3em;
    width: 1.3em;
    transition: all 0.3s ease;
    background-color: hsl(var(--h), var(--s), var(--l));
    box-sizing: border-box;
  }

  .color:not(.selected){
    border-radius: 0.2em;
  }

  .color:not(.selected):hover{
    transform: scale(1.2);
    cursor: pointer;
  }

  .blank:not(.selected){
    filter: drop-shadow(0 0 0.1em rgba(0,0,0,0.2));
  }

  .reset-button{
    height: 100%;
    width: 100%;
  }
</style>