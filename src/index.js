import './obj.js'
import './str.js'
import './arr.js'
import './fn.js'
import './url.js'
import './date.js'

// useful pipes
export default {
  ...Function,
  str: String,
  arr: Array,
  obj: Object,
  date: Object.assign((s, format) => Date.format(s, format), Date)
}