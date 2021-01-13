<script>
  import ConfigPanelGrid from './ConfigPanelGrid.svelte'

  import { step } from './stores.js'

  export let gridSize
  export let layoutRotation

  const rotateRight = () => { layoutRotation = (layoutRotation + 90) % 360 }
  const rotateLeft = () => { layoutRotation = (layoutRotation - 90 + 360) % 360 }
  const handleClickGoButton = () => { step.setPainting() }
  
  $: painting = $step == 'painting'
	$: configuring = $step == 'configuring'
</script>

<div class="cell">
  <ConfigPanelGrid {...{configuring, painting}}>
    <div slot='rotate-buttons'>
      <button on:click={rotateLeft} class='secondary-button' aria-label='rotate left'>
        <div class='secondary-button-content rotate rotate-left'/>
      </button>
      <button on:click={rotateRight} class='secondary-button' aria-label='rotate right'>
        <div class='secondary-button-content rotate rotate-right'/>
      </button>
    </div>
    <p slot='label' class='label'>{gridSize} x {gridSize}</p>
    <input type='range' slot='slider' bind:value={gridSize} min={5} max={50} step={1}>
    <button slot='go-button' class='go-button' on:click={handleClickGoButton}>Go!</button>
  </ConfigPanelGrid>
</div>

<style>
  .cell{
    grid-area: config-panel;
    align-self: center;
    text-align: center;
  }

  .label {
    font-weight: 900;
    font-size: 2em;
  }

  .go-button {
    width: 2.5em;
    height: 2.5em;
    border-radius: 2.5em;
  }

  .rotate {
    width: 1.2em;
    height: 1.2em;
  }

  .rotate-left {
    mask: url('../img/rotate-left.svg');
    -webkit-mask: url('../img/rotate-left.svg') no-repeat center;
  }

  .rotate-right {
    mask: url('../img/rotate-right.svg');
    -webkit-mask: url('../img/rotate-right.svg') no-repeat center;
  }

  input {
    -webkit-appearance: none;
    height: 1em;
    width: 80%;
    border-radius: 0.4em;
    margin: 0.5em 0;
    background: #d3d3d3;
    outline: none;
    -webkit-transition: .2s;
    transition: opacity .2s;
  }

  input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: none;
    background: #4CAF50;
    cursor: pointer;
  }

  input::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
  }
</style>