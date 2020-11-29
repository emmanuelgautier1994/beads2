<script>
  import ConfigPanelGrid from './ConfigPanelGrid.svelte'

  export let gridSize
  export let layoutRotation
  export let configuring
  export let painting
  export let toggleStep

  const rotateRight = () => { layoutRotation = (layoutRotation + 90) % 360 }
	const rotateLeft = () => { layoutRotation = (layoutRotation - 90 + 360) % 360 }
</script>

<div class="cell">
  <ConfigPanelGrid {...{configuring, painting}}>
    <div slot='rotate-buttons'>
      <button on:click={rotateLeft}>L</button>
      <button on:click={rotateRight}>R</button>
    </div>
    <p slot='label' class='label'>{gridSize} x {gridSize}</p>
    <input type='range' slot='slider' bind:value={gridSize} min={5} max={50} step={1}>
    <button slot='go-button' class='go-button' on:click={toggleStep}>Go!</button>
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

  button {
    background: #4CAF50;
    font-weight: 900;
    font-size: 2em;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    outline: none;
    border: none;
  }

  button:hover {
    background: #378039;
  }

  .go-button {
    width: 2.5em;
    height: 2.5em;
    border-radius: 2.5em;
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