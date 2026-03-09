import type { Directive } from 'vue'

const vHighlight: Directive<HTMLElement> = {
  mounted: (el) => {
    el.classList.add('text-green-500')
  },
  updated: (el) => {
    el.classList.add('text-green-500')
  },
  unmounted: (el) => {
    el.classList.remove('text-green-500')
  },
}

export { vHighlight }
