import { writable } from 'svelte/store';
import { areEqual } from './utils.js'

const defaultSelectedColorID = () => 0
const defaultColorPalette = () => ([
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
])
// const defaultCanvas = () => ({...Array(400).fill().map((_,i) => (Math.floor(i/20) % 5))})
const defaultCanvas = () => ({})
const defaultHistory = () => ({cursor: 0, versions:[defaultCanvas()]})

const createStep = () => {
  const { subscribe, update, set } = writable("configuring")

  return {
    subscribe,
    update,
    setPainting: () => set("painting"),
    setConfiguring: () => set("configuring")
  }
}

const createSelectedColorID = () => {
  const { subscribe, update, set } = writable(defaultSelectedColorID())

  return {
    subscribe,
    update,
    set,
    reset: () => set(defaultSelectedColorID())
  }
}

const createColorPalette = () => {
  const { subscribe, update, set } = writable(defaultColorPalette())

  return {
    subscribe,
    update,
    set,
    reset: () => set(defaultColorPalette())
  }
}

const createCanvasColors = () => {
  const { subscribe, update, set } = writable(defaultCanvas())

  return {
    subscribe,
    update,
    set,
    reset: () => set(defaultCanvas()),
  }
}

const createHistory = () => {
  const { subscribe, update, set } = writable(defaultHistory())

  return {
    subscribe,
    commit: (newData) => update((history) => {
      const newCanvas = {...(history.versions[history.cursor]), ...newData}

      if(areEqual(history.versions[history.cursor],newCanvas)) return history
      return {cursor: history.cursor+1, versions: [...history.versions.slice(0, history.cursor+1), newCanvas]}
    }),
    undo: () => update((history) => (history.cursor === 0 ? history : {...history, cursor: history.cursor - 1})),
    redo: () => update((history) => (history.cursor === history.versions.length - 1 ? history : {...history, cursor: history.cursor + 1})),
    reset: () => set(defaultHistory())
  }
}

export const selectedColorId = createSelectedColorID()
export const canvasColors = createCanvasColors()
export const colorPalette = createColorPalette()
export const step = createStep()
export const history = createHistory()
