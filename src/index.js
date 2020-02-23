import './obj.js'
import './str.js'
import './arr.js'
import './fn.js'
import './date.js'

// useful pipes
export const pipes = {
  ...Function,
  str: String,
  arr: Array,
  obj: Object,
  date: Object.assign((s, format) => Date.format(s, format), Date)
}