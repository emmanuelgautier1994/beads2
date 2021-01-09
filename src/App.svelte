<script>
	import Logo from './Logo.svelte'
	import ConfigPanel from './ConfigPanel.svelte'
	import PaintingToolbox from './PaintingToolbox.svelte'
	import Workspace from './Workspace.svelte'
	import Canvas from './Canvas.svelte'

	let step = 'configuring'
	let gridSize = 20
	let layoutRotation = 90
	$: painting = step == 'painting'
	$: configuring = step == 'configuring'

	const toggleStep = () => { step = {configuring: "painting", painting: "configuring"}[step] }
</script>

<main class:painting class:configuring>
	<Logo />
	<ConfigPanel bind:gridSize bind:layoutRotation {...{toggleStep, configuring, painting}} />
	{#if painting}
		<PaintingToolbox {...{toggleStep}} />
	{/if}

	<Workspace>
		<Canvas {...{painting, gridSize, layoutRotation}} />
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
		grid-template-rows: 15vh;
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