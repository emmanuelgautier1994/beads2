<script>
  import Bead from './Bead.svelte'
  export let gridSize
  export let layoutRotation
  export let painting

  const range = (s) => [...Array(s).keys()]

  $: totalSideWidth = 2 * (gridSize + 1)
  $: totalSideHeight = 2 * (gridSize + 2)
  $: viewBox = `0 0 ${totalSideWidth} ${totalSideHeight}`

  const beadSizeRatio = 0.82
  const beadWidth = 2 * beadSizeRatio
  const beadHeight = 2

  const makeBeads = (size, h, w, totalH, totalW, angle) => {
    switch(angle) {
      case 90 :
        return range(size).flatMap(i => range(size).flatMap(j=> ({
          id: i*size + j,
          x: totalH - (i % 2 ? h * (j + 1) : h * (j + 1.5)),
          y: w * (i + 1.5) + 3,
          height: w,
          width: h,
        })))
      case 180 :
        return range(size).flatMap(i => range(size).flatMap(j=> ({
          id: i*size + j,
          x: totalW - (w * (i + 1.5)) - 6,
          y: totalH - (i % 2 ? h * (j + 1) : h * (j + 1.5)) + 1,
          height: h,
          width: w,
        })))
      case 270 :
        return range(size).flatMap(i => range(size).flatMap(j=> ({
          id: i*size + j,
          x: i % 2 ? h * (j + 1) : h * (j + 1.5) - 2,
          y: totalW - (w * (i + 1.5) + 3) - 2,
          height: w,
          width: h,
        })))
      default :
        return range(size).flatMap(i => range(size).flatMap(j=> ({
          id: i*size + j,
          x: w * (i + 1.5) + 2,
          y: i % 2 ? h * (j + 1) : h * (j + 1.5),
          height: h,
          width: w,
        })))
    }
  }

  $: beads = makeBeads(gridSize, beadHeight, beadWidth, totalSideWidth, totalSideHeight, layoutRotation)
</script>

<svg {viewBox}>
  {#each beads as bead (bead.id)}
    <Bead {...bead} />
  {/each}
</svg>

<style>
  svg{
    /* border: red 2px solid; */
    touch-action: none;
    max-height: 80vh;
  }
</style>