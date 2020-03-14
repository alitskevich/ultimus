Object.EMPTY = Object.freeze({});

/**
 * Checks if argument is empty .
 */
Object.isEmpty = (x) => {
    if (!x) {
        return true;
    }
    if (x instanceof Object) {
        // (zero-length array)
        if (Array.isArray(x)) {
            return x.length === 0;
        }
        // (zero-size map)
        if (x instanceof Map) {
            return x.size === 0;
        }
        // (has no props)
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
Object.dig = (o, steps) => (steps.reduce ? steps : steps.split('.')).reduce((r, e) => r ? r[e] : undefined, o);

Object.dot = (x, k) => x && k in x ? x[k] : undefined

Object.decode = (val) => {
  const value = decodeURIComponent(val);
  if ('{['.indexOf(value[0]) > -1) {
    return JSON.parse(value);
  }
  return Object.decodePrimitive(val)
};

Object.decodePrimitive = (map => value => {
  if (value && '1234567890+-'.includes(value[0]) && value.length <= 17) {
    const num = +value
    return isNaN(num) ? value : num
  }
  return value in map ? map[value] : value
})({
  true: true,
  false: false,
  null: null,
  undefined
})

Object.encode = (value) => {
  return encodeURIComponent((typeof value === 'object') ? JSON.stringify(value) : `${value}`);
}

/**
 * Parses string into URL object like `{type, target, path, params, data }`.
 *
 * @param {string} s string in format: `type:target/path?params#data`
 * @param {object} r optional target object
 * @returns URL object 
 */
Object.urlParse = function (s, r = {}) {
  if (!s) {
    return { path: [], params: {}, target: '', ...r };
  }
  if (typeof s === 'object') {
    return { path: [], params: {}, target: '', ...r, ...s };
  }
  let p;
  // extract type:
  p = s.indexOf(':');
  if (p > -1) {
    r.type = s.slice(0, p);
    s = s.slice(p + 1);
  }
  // extract data:
  p = s.indexOf('#');
  if (p > -1) {
    r.data = Object.decode(s.slice(p + 1));
    s = s.slice(0, p);
  }
  // extract query params:
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
  }
  // target and path:
  let path = r.path = s.split('/').map(decodeURIComponent);
  while (path.length && !r.target) {
    r.target = path.shift();
  }
  return r;
}

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
    const keys = Object.keys(params).filter(key => (params[key] != null));
    if (keys.length) {
      result += `?${keys.map(key => (`${key}=${Object.encode(params[key])}`)).join('&')}`;
    }
  }
  if (r.data) {
    result += `#${Object.encode(r.data)}`;
  }
  return result;
}

