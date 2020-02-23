(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/arr.js":
/*!********************!*\
  !*** ./src/arr.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/** ***********************
 * Arrays.
 */
Array.EMPTY = Object.freeze([]);

Array.slice = (x, b = 0, e) => x ? x.slice(b, e) : [];
/**
 * Builds histogram on given field for given list.
 *
 * @param {*} list source
 * @param {*} field to be used as group key
 */


Array.groupBy = function (list, field = 'type') {
  const result = {};
  const fieldFn = typeof field === 'string' ? e => e[field] : field;

  const iter = (v, entry) => {
    const slot = result[v] || (result[v] = {
      id: v,
      count: 0,
      subs: []
    });
    slot.count++;
    (slot.items || (slot.items = slot.subs)).push(entry);
  };

  (list || []).forEach(e => {
    const value = fieldFn(e);

    if (Array.isArray(value)) {
      value.forEach(v => iter(v, e));
    } else {
      iter(value, e);
    }
  });
  return result;
};
/**
 * Sorts array by element property.
 *
 * @param {*} arr source
 * @param {*} property element property to sort by
 * @param {*} order
 */


Array.sortBy = function sortBy(arr, property = 'name', order = 1) {
  let fn = property;

  if (typeof property === 'string') {
    if (property[0] === '-') {
      /* eslint-disable */
      order = -1;
      property = property.substr(1);
    }

    fn = e => e[property];
  }

  function compare(a, b) {
    const aa = fn(a);
    const bb = fn(b);
    /* eslint-disable */

    return aa < bb ? -order : aa > bb ? order : 0;
  }

  return (arr || []).slice(0).sort(compare);
};
/**
 * Produces key/value index on given array.
 * 
 * @param {*} arr source array
 * @param {*} idKey id key
 * @param {*} valKey value key
 */


Array.index = Array.toHash = (arr, idKey = 'id', valKey) => {
  const r = {};

  if (arr) {
    const isKeyFn = typeof idKey === 'string' ? e => e[idKey] : idKey;
    arr.forEach(e => {
      r[isKeyFn(e)] = valKey ? e[valKey] : e;
    });
  }

  return r;
};

/***/ }),

/***/ "./src/date.js":
/*!*********************!*\
  !*** ./src/date.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

const R = {
  ru: {
    monthNames: ['', 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthNamesShort: ['', 'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
  },
  en: {
    monthNames: ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  }
};

Date.orNow = x => x ? Date.narrow(x) : new Date();

Date.l18n = key => Object.dig(R[Date.LOCALE || 'ru'], key);

Date.daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

Date.firstOfWeek = (d, x = Date.narrow(d)) => new Date(x.getFullYear(), x.getMonth(), x.getDate() - x.getDay());

Date.monthName = (m, mode = '') => Date.l18n(`monthNames${mode}.${m}`);

Date.fractions = (x = new Date()) => [x.getFullYear(), x.getMonth(), x.getDate(), x.getHours(), x.getMinutes(), x.getSeconds(), x.getMilliseconds()];

Date.parseISO8601 = function (x) {
  Function.assert(typeof x === 'string', `Date.parseISO8601: not a string: ${x}`);

  if (x.length === 10) {
    x += 'T12:00';
  }

  const timebits = /^([0-9]{4})-([0-9]{2})-([0-9]{2})[ T]([0-9]{2}):([0-9]{2})(?::([0-9]*)(\.[0-9]*)?)?(Z?)(([+-])([0-9]{2})([0-9]{2}))?/;
  const m = timebits.exec(x);

  if (!m) {
    return null;
  }

  const tz = m[8] ? !m[9] ? 0 : (m[10] === '+' ? -1 : +1) * (parseInt(m[11]) * 60 + parseInt(m[12])) : new Date().getTimezoneOffset(); // utcdate is milliseconds since the epoch

  const utcdate = Date.UTC(parseInt(m[1]), parseInt(m[2]) - 1, // months are zero-offset (!)
  parseInt(m[3]), parseInt(m[4]), parseInt(m[5]), // hh:mm
  m[6] && parseInt(m[6]) || 0, // optional seconds
  m[7] && parseFloat(m[7]) || 0);
  return new Date(utcdate + tz * 60000);
};
/**
 * Universal all-weather converter to Date.
 *
 * @param {*} x any value to be converted to date
 * @returns Date instance or null
 */


Date.narrow = x => {
  const type = typeof x;

  if (x == null) {
    return null;
  }

  if (type === 'number' || +x == x) {
    return new Date(+x);
  }

  if (type === 'object') {
    // Date already
    if (x.getTime) {
      return x;
    } // having a date re-presentation method


    if (x.toDate) {
      return x.toDate();
    } // firestore timestamp for web


    if (x.seconds && x.nanoseconds != null) {
      return new Date(x.seconds * 1000 + x.nanoseconds);
    }
  }

  return Date.parseISO8601(x);
};

Date.formatTimezone = tzOffset => {
  const toNumber = Number(tzOffset);
  return toNumber ? toNumber >= 0 ? `+${String.pad(toNumber / 60)}:${String.pad(toNumber % 60)}` : `-${String.pad(-toNumber / 60)}:${String.pad(-toNumber % 60)}` : '';
};

const DATE_FORMATTERS = {
  hh: date => String.pad(date.getHours()),
  ii: date => String.pad(date.getMinutes()),
  hi: date => String.pad(date.getHours()) + ':' + String.pad(date.getMinutes()),
  dd: date => String.pad(date.getDate()),
  w: date => '' + Date.l18n(`dayNames.${date.getDay()}`),
  ww: date => '' + Date.l18n(`dayNamesShort.${date.getDay()}`),
  d: date => '' + date.getDate(),
  mmmm: date => Date.monthName(date.getMonth() + 1, ''),
  mmm: date => Date.monthName(date.getMonth() + 1, 'Short'),
  mm: date => String.pad(date.getMonth() + 1),
  yyyy: date => `${date.getFullYear()}`,
  ll: date => `${date.getTime()}`,
  z: date => `Z${Date.formatTimezone(date.getTimezoneOffset())}`
};

Date.format = (x, format = 'yyyy-mm-dd') => {
  if (!x) {
    return '';
  }

  const date = Date.narrow(x);
  return !date ? '' : format.replace(/[_]/g, '\n').replace(/[hidwmylz]+/g, key => {
    const fn = DATE_FORMATTERS[key];
    return fn ? fn(date) : key;
  });
};

Date.dateKey = d => {
  const ms = Date.narrow(d).getTime();
  return Date.format(ms - ms % (24 * 3600000) + 12 * 3600000, 'yyyy-mm-dd');
};

/***/ }),

/***/ "./src/fn.js":
/*!*******************!*\
  !*** ./src/fn.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Functions
 */
Object.assign(Function, {
  ID: x => x,
  next: (COUNTER => (p = '') => p + COUNTER++)(1),
  // system
  throw: (error, ErrorType = Error) => {
    throw typeof error === 'string' ? new ErrorType(error) : error;
  },
  assert: (b, error, ErrorType = Error) => {
    if (!b) {
      throw typeof error === 'string' ? new ErrorType(error) : error;
    }
  },
  log: (x, pre) => {
    console.log(pre || 'pipe', x);
    return x;
  },
  track: (fn, x, y) => (...args) => {
    console.log('track', x || y);
    return (fn || Function.ID)(...args);
  },
  // eslint-disable-next-line no-debugger
  debugger: () => {
    debugger;
  },
  // data structures
  dot: (x, k) => x ? x[k] : null,
  includes: (x, p) => x.includes && x.includes(p),
  // logical
  then: (x, p = '', n = '') => x ? p : n,
  not: x => !x,
  isUndefined: x => typeof x === 'undefined',
  isTrue: x => x === true,
  isFalse: x => x === false,
  or: (x, s) => x || s,
  and: (x, s) => x && s,
  // math
  // eslint-disable-next-line eqeqeq
  equals: (x, p) => x == p,
  greater: (x, p) => x > p,
  less: (x, p) => x < p,
  plus: (x, alt) => +x + +alt,
  minus: (x, alt) => +x - +alt,
  multiply: (x, alt) => +x * +alt,
  compose: (...ff) => x0 => ff.reduceRight((x, f) => f(x), x0),
  swap: f => (a, b) => f(b, a),
  curry: (() => {
    const _curry = (fn, args0, lengthLimit) => {
      const fx = args => args.length >= lengthLimit ? fn(...args) : _curry(fn, args, lengthLimit - args.length);

      return (...args) => fx([...args0, ...args]);
    };

    return (f, ...args) => _curry(f, args, f.length);
  })(),

  /* Simple GUID generator. */
  guid: (s4 => () => `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`)(() => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)),

  /* Simple hash function. */
  hash: function (s) {
    let a = 1,
        c = 0,
        h,
        o;

    if (s) {
      a = 0;
      /* jshint plusplus:false bitwise:false */

      for (h = s.length - 1; h >= 0; h--) {
        o = s.charCodeAt(h);
        a = (a << 6 & 268435455) + o + (o << 14);
        c = a & 266338304;
        a = c !== 0 ? a ^ c >> 21 : a;
      }
    }

    return String(a);
  }
});

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: pipes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pipes", function() { return pipes; });
/* harmony import */ var _obj_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./obj.js */ "./src/obj.js");
/* harmony import */ var _obj_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_obj_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _str_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./str.js */ "./src/str.js");
/* harmony import */ var _str_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_str_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _arr_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./arr.js */ "./src/arr.js");
/* harmony import */ var _arr_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_arr_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fn_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fn.js */ "./src/fn.js");
/* harmony import */ var _fn_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_fn_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./date.js */ "./src/date.js");
/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_date_js__WEBPACK_IMPORTED_MODULE_4__);




 // useful pipes

const pipes = { ...Function,
  str: String,
  arr: Array,
  obj: Object,
  date: Object.assign((s, format) => Date.format(s, format), Date)
};

/***/ }),

/***/ "./src/obj.js":
/*!********************!*\
  !*** ./src/obj.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

Object.EMPTY = Object.freeze({});
/**
 * Checks if argument is empty .
 */

Object.isEmpty = x => {
  if (!x) {
    return true;
  }

  if (x instanceof Object) {
    // (zero-length array)
    if (Array.isArray(x)) {
      return x.length === 0;
    } // (zero-size map)


    if (x instanceof Map) {
      return x.size === 0;
    } // (has no props)


    return Object.keys(x).length === 0;
  }

  return false;
};
/**
 * Digs value in a given object structure by a given path.
 *
 * @param {*} o source object
 * @param {*} steps path
 * @param {*} def default value
 */


Object.dig = (o, steps) => steps.split('.').reduce((r, e) => r ? r[e] : undefined, o);

Object.dot = (x, k) => x ? x[k] : null;

const VALUE_MAP = {
  true: true,
  false: false,
  undefined
};

Object.decode = val => {
  const value = decodeURIComponent(val);

  if ('{['.indexOf(value[0]) > -1) {
    return JSON.parse(value);
  }

  const num = +value;

  if (value.length <= 17 && !isNaN(num)) {
    return num;
  }

  return VALUE_MAP[value] || value;
};

Object.encode = value => {
  return encodeURIComponent(typeof value === 'object' ? JSON.stringify(value) : `${value}`);
};
/**
 * Parses string into URL object like `{type, target, path, params, data }`.
 *
 * @param {string} s string in format: `type:target/path?params#data`
 * @param {object} r optional target object
 * @returns URL object 
 */


Object.urlParse = function (s, r = {}) {
  if (!s) {
    return {
      path: [],
      params: {},
      target: '',
      ...r
    };
  }

  if (typeof s === 'object') {
    return {
      path: [],
      params: {},
      target: '',
      ...r,
      ...s
    };
  }

  let p; // extract type:

  p = s.indexOf(':');

  if (p > -1) {
    r.type = s.slice(0, p);
    s = s.slice(p + 1);
  } // extract data:


  p = s.indexOf('#');

  if (p > -1) {
    r.data = Object.decode(s.slice(p + 1));
    s = s.slice(0, p);
  } // extract query params:


  p = s.indexOf('?');
  r.params = r.params || {};

  if (p > -1) {
    for (let param of s.slice(p + 1).split('&')) {
      let [key, value] = param.split('=');

      if (value) {
        r.params[key] = Object.decode(value);
      }
    }

    s = s.slice(0, p);
  } // target and path:


  let path = r.path = s.split('/').map(decodeURIComponent);

  while (path.length && !r.target) {
    r.target = path.shift();
  }

  return r;
};
/**
*  Represents an URL object as a string
*
* @param {object} r URL object like `{type, target, path, params, data }`
* @returns string in format `type://target/path?params#data`
*/


Object.urlStringify = function (r) {
  let result = '';

  if (!r) {
    return result;
  }

  if (typeof r === 'string') {
    return r;
  }

  if (r.target) {
    if (r.type) {
      result += `${r.type}://`;
    }

    result += r.target;
  }

  if (r.path) {
    result += `/${Array.isArray(r.path) ? r.path.map(encodeURIComponent).join('/') : r.path}`;
  }

  const params = r.params;

  if (params) {
    const keys = Object.keys(params).filter(key => params[key] != null);

    if (keys.length) {
      result += `?${keys.map(key => `${key}=${Object.encode(params[key])}`).join('&')}`;
    }
  }

  if (r.data) {
    result += `#${Object.encode(r.data)}`;
  }

  return result;
};

/***/ }),

/***/ "./src/str.js":
/*!********************!*\
  !*** ./src/str.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

function capitalize(x) {
  if (!x) {
    return x;
  }

  const s = `${x}`;
  return s[0].toUpperCase() + s.slice(1);
}

function camelize(s, sep = '_') {
  return s && s.length && s.split(sep).map((t, i) => i ? capitalize(t) : t).join('') || ``;
}
/**
 * Formats given string template with params.
 *
 * Template should contain placeholders like `{someKey}`,
 * which will be replaced with value by key from params.
 *
 * @param {string} template string template
 * @param {object} params hash with parameters
 */


String.format = (template, params) => {
  return `${template || ''}`.replace(/\{([\S]+)\}/i, (_, key) => (params && params[key]) != null ? params[key] : '');
};

String.wrap = (x, template) => {
  return !x ? '' : `${template || '*'}`.replace('*', x);
};

String.tail = (x, sep = '.') => {
  if (!x) {
    return '';
  }

  const pos = x.lastIndexOf(sep);
  return pos === -1 ? x : x.slice(pos + sep.length);
};

String.lastTail = (key, sep = '.') => ('' + key).split(sep).slice(-1)[0];

String.head = (x, sep = '.') => {
  if (!x) {
    return '';
  }

  const pos = x.indexOf(sep);
  return pos === -1 ? x : x.slice(0, pos);
};

String.pad = (x, size = 2, fill = '0') => {
  let s = String(x);

  while (s.length < size) {
    s = `${fill}${s}`;
  }

  return s;
};

String.capitalize = capitalize;
String.camelize = camelize;

String.mirror = x => (x || '').split('').reduce((r, c) => c + r, '');

String.snakeCase = x => (x || '').replace(/([a-z])([A-Z])/g, '$1_$2');

String.proper = s => capitalize(camelize(s));

String.upper = s => ('' + s).toUpperCase();

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/index.js */"./src/index.js");


/***/ })

/******/ });
});
//# sourceMappingURL=main.js.map