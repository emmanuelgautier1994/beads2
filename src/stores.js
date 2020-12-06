import { writable } from 'svelte/store';

const createColorPalette = () => {
  const { subscribe, set, update } = writable(
    [
      {h: 175, s:65, l:35, id: 0},
      {h: 150, s:74, l:72, id: 1},
      {h: 50, s:91, l:70, id: 2},
      {h: 11, s:100, l:85, id: 3},
      {h: 16, s:95, l:65, id: 4},
      {h: 0, s:100, l:100, id: 5},
      {h: 0, s:100, l:100, id: 6},
      {h: 0, s:100, l:100, id: 7},
      {h: 0, s:100, l:100, id: 8},
      {h: 0, s:100, l:100, id: 9},
      {h: 0, s:100, l:100, id: 10},
      {h: 0, s:100, l:100, id: 11},
    ]
  )

  return {
    subscribe,
    set,
    updateColor: (newColor) => update(palette => palette.map(
      (color, i) => i === newColor.id ? newColor : color)
    )
  }
}

const defaultCanvas = () => ({...Array(400).fill().map((_,i) => (Math.floor(i/20) % 5))})

export const colorPalette = createColorPalette()
export const selectedColorId = writable(0)
export const canvasColors = writable (defaultCanvas())