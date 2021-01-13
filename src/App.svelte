<script>
	import Logo from './Logo.svelte'
	import ConfigPanel from './ConfigPanel.svelte'
	import PaintingToolbox from './PaintingToolbox.svelte'
	import Workspace from './Workspace.svelte'
	import Canvas from './Canvas.svelte'

	import { step } from './stores.js'

	let gridSize = 20
	let layoutRotation = 90
	$: painting = $step == 'painting'
	$: configuring = $step == 'configuring'
</script>

<main class:painting class:configuring>
	<Logo />
	<ConfigPanel bind:gridSize bind:layoutRotation />
	{#if painting}
		<PaintingToolbox />
	{/if}

	<Workspace>
		<Canvas {...{gridSize, layoutRotation}} />
	</Workspace>
</main>

<style>
	main {
		padding: 0;
		margin: 0;
		width: 100%;
		height: 100%;

		display: grid;
		grid-template-columns: 15rem 10rem 1fr;
		grid-template-rows: 7rem;
		gap: 0.5em 0.5em;
	}

	.painting {
		grid-template-areas: 
			"logo config-panel painting-toolbox"
			"workspace workspace workspace";
	}

	.configuring {
		grid-template-areas: 
			"logo config-panel config-panel"
			"workspace workspace workspace";
	}
</style>