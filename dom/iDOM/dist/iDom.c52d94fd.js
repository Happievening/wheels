// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"iDom.js":[function(require,module,exports) {
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

window.dom = {
  /** create
   * ????????????????????????
   * @param {string} string ???????????????
   * @returns ??????????????????????????????????????????????????????
   */
  create: function create(string) {
    //template??????????????????????????????????????????????????????????????????DOM????????????
    var container = document.createElement("template");
    //?????????????????????????????????
    container.innerHTML = string.trim();
    return container.content.firstChild;
  },


  /** after
   * ??????????????????????????????????????????
   * DOM?????????insertBefore????????????????????????????????????
   * @param {Node} nodeForPositioning ????????????
   * @param {Node} nodeToInsert ??????????????????
   * @returns
   * @example dom.after(node1, node2)
   */
  after: function after(nodeForPositioning, nodeToInsert) {
    nodeForPositioning.parentNode.insertBefore(nodeToInsert, nodeForPositioning.nextSibling);
  },


  /** before
   * ??????????????????????????????????????????
   * DOM?????????insertBefore????????????????????????????????????
   * @param {Node} nodeForPositioning ????????????
   * @param {Node} nodeToInsert ??????????????????
   * @returns
   * @example dom.before(node1, node2)
   */
  before: function before(nodeForPositioning, nodeToInsert) {
    nodeForPositioning.parentNode.insertBefore(nodeToInsert, nodeForPositioning);
  },


  /** append
   * ????????????????????????????????????
   * @param {Node} parentNode ?????????
   * @param {Node} childNode ?????????????????????
   * @returns
   */
  append: function append(parentNode, childNode) {
    return parentNode.appendChild(childNode);
  },


  /** wrap
   * ???????????????node????????????????????????parent???
   * @param {Node} childNode ?????????????????????
   * @param {Node} parentNode ???????????????
   * @returns
   */
  wrap: function wrap(childNode, parentNode) {
    dom.before(childNode, parentNode);
    dom.append(parentNode, childNode);
  },


  /** remove
   * ??????????????????,DOM?????????????????????????????????????????????????????????
   * @param {Node} node ??????????????????
   * @returns ??????????????????????????????
   */
  remove: function remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },


  /** empty
   * ??????????????????????????????????????????????????????????????????
   * @param {Node} node ??????????????????
   * @param {boolean} text ?????????????????????????????????????????????????????????false
   * @returns ????????????????????????????????????????????????
   */
  empty: function empty(node) {
    var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    //const childNodes = node.childNodes;
    var childNodes = node.childNodes;

    var array = [];
    var length = childNodes.length;
    for (var _i = text ? 0 : 1; _i < length; _i++) {
      array.push(dom.remove(childNodes[text ? 0 : 1]));
    }
    return array;
  },


  /** attr
   * ??????????????????????????????????????????????????????????????????
   * @param {*} node ????????????
   * @param {*} name ?????????
   * @param {*} value ?????????
   * ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
   * @returns 2???????????????????????????????????????3?????????????????????????????????
   */
  attr: function attr(node, name, value) {
    if (arguments.length === 3) {
      node.setAttribute(name.toString(), value);
      return node;
    } else if (arguments.length === 2) {
      return node.getAttribute(name.toString());
    }
  },


  /** text
   * ?????????????????????????????????????????????????????????????????????????????????
   * @param {Node} node ????????????
   * @param {string} value ??????????????????
   * ??????????????????value??????????????????????????????????????????????????????value?????????????????????????????????????????????
   * @returns 1????????????????????????????????????2?????????????????????????????????
   */
  text: function text(node, value) {
    if (arguments.length === 2) {
      node.innerText = value.toString();
      return node;
    } else if (arguments.length === 1) {
      return node.innerText;
    }
  },


  /** html
   * ???????????????????????????????????????????????????????????????HTML????????????
   * @param {Node} node ????????????
   * @param {string} value ??????HTML??????
   * ??????????????????value??????????????????HTML??????????????????????????????value?????????HTML??????????????????????????????
   * @returns 1???????????????????????????HTML???2?????????????????????????????????
   */
  html: function html(node, value) {
    if (arguments.length === 2) {
      node.innerHTML = value.toString();
      return node;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },


  /** style
   * ??????1: ????????????????????????????????????????????????style??????????????????????????????
   * ??????2: ?????????????????????????????????????????????????????????????????????style??????????????????????????????
   * ??????3: ??????????????????????????????????????????style????????????????????????????????????
   * @param {Node} node ????????????
   * @param {Parameter} value ??????valueObject??????????????????????????????????????????????????????????????????
   * @returns ??????2???3: ??????????????????????????????????????? => ??????????????????; ??????1??? style????????????????????????
   * @examples ??????1????????????dom.style(s1, "border")
   * @examples ??????2????????????dom.style(s1, "border", "1px solid red")
   * @examples ??????3????????????dom.style(s1, {"border":"1px solid blue", "color":"pink"})
   */
  style: function style(node) {
    for (var _len = arguments.length, value = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      value[_key - 1] = arguments[_key];
    }

    if (value.length === 1) {
      //?????????????????????3
      if (value[0].constructor === Object) {
        //in????????????????????????
        for (i in value[0]) {
          node.style[i] = value[0][i];
        }
        return node;
      } else if (value[0].constructor === String) {
        //????????????????????????1
        return node.style[value[0]];
      }
    } else if (value.length === 2) {
      //??????2
      node.style[value[0]] = value[1];
      return node;
    }
  },


  /** addClass
   * ?????????????????????class?????????class??????????????????
   * @param {Node} node ????????????
   * @param {...Parameters} newClass ??????class???????????????
   * @returns ??????????????????
   */
  addClass: function addClass(node) {
    var _node$classList;

    for (var _len2 = arguments.length, newClass = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      newClass[_key2 - 1] = arguments[_key2];
    }

    //???newClass??????????????????
    (_node$classList = node.classList).add.apply(_node$classList, _toConsumableArray(newClass));
    return node;
  },


  /** removeClass
   * ?????????????????????class?????????class??????????????????
   * @param {Node} node ????????????
   * @param {...Parameters} classToRemove ????????????class
   * @returns ??????????????????
   */
  removeClass: function removeClass(node) {
    var _node$classList2;

    for (var _len3 = arguments.length, classToRemove = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      classToRemove[_key3 - 1] = arguments[_key3];
    }

    //???classToRemove??????????????????
    (_node$classList2 = node.classList).remove.apply(_node$classList2, _toConsumableArray(classToRemove));
    return node;
  },


  //?????????????????????class???????????????????????????????????????
  class: {
    add: function add(node) {
      var _node$classList3;

      for (var _len4 = arguments.length, newClass = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        newClass[_key4 - 1] = arguments[_key4];
      }

      //???newClass??????????????????
      (_node$classList3 = node.classList).add.apply(_node$classList3, _toConsumableArray(newClass));
      return node;
    },
    remove: function remove(node) {
      var _node$classList4;

      for (var _len5 = arguments.length, classToRemove = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        classToRemove[_key5 - 1] = arguments[_key5];
      }

      //???classToRemove??????????????????
      (_node$classList4 = node.classList).remove.apply(_node$classList4, _toConsumableArray(classToRemove));
      return node;
    }
  },

  /** on
   * ???????????????????????????
   * @param {node} ????????????????????????
   * @param {event} ????????????
   * @param {fn} ????????????
   * @returns
   */
  on: function on(node, event, fn) {
    return node.addEventListener(event, fn);
  },


  /** off
   * ?????????????????????????????????
   * @param {node} ????????????????????????
   * @param {event} ??????
   * @param {fn} ????????????
   * @returns
   */
  off: function off(node, event, fn) {
    return node.removeEventListener(event, fn);
  },


  /** find
   * ???????????????????????????????????????????????????
   * @param {string} CSS??????????????????
   * @param {range} ???????????????????????????id?????????????????????????????????
   * @returns NodeList
   */
  find: function find(selector) {
    var range = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

    return range.querySelectorAll(selector);
  },


  /** parent
   * ?????????????????????????????????
   * @param {string} CSS??????????????????
   * @param {range} ???????????????????????????id?????????????????????????????????
   * @returns ?????????
   */
  parent: function parent(node) {
    return node.parentNode;
  },


  /** children
   * ??????????????????????????????????????????
   * @param {Node} node ????????????
   * @param {boolean} textNode ????????????????????????????????????false
   * @returns ?????????????????????????????????
   */
  children: function children(node) {
    var textNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    return textNode ? node.childNodes : node.children;
  },


  /** siblings
   * ???????????????????????????????????????
   * @param {Node} node ??????????????????
   * @param {boolean} textNode ????????????????????????????????????false
   * @returns ?????????????????????????????????
   */
  siblings: function siblings(node) {
    var textNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (textNode) {
      return Array.from(node.parentNode.childNodes).filter(function (n) {
        return n !== node;
      });
    } else {
      return Array.from(node.parentNode.children).filter(function (n) {
        return n !== node;
      });
    }
  },


  /** next
   * ??????????????????????????????????????????
   * @param {Node} node ??????????????????
   * @param {boolean} textNode ????????????????????????????????????false
   * @returns ???????????????
   */
  next: function next(node) {
    var textNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (textNode) {
      return node.nextSibling;
    } else {
      var next = node.nextSibling;
      while (next.nodeType !== 1) {
        next = next.nextSibling;
      }
      return next;
    }
  },


  /** previous
   * ??????????????????????????????????????????
   * @param {Node} node ??????????????????
   * @param {boolean} textNode ????????????????????????????????????false
   * @returns ???????????????
   */
  previous: function previous(node) {
    var textNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (textNode) {
      return node.previousSibling;
    } else {
      var prev = node.previousSibling;
      while (prev.nodeType !== 1) {
        prev = prev.previousSibling;
      }
      return prev;
    }
  },


  /** each
   * ??????????????????????????????????????????????????????????????????????????????????????????????????????
   * @param {NodeList} nodeList ?????????????????????????????????
   * @param {function} fn ????????????
   * @param {boolean} textNode ????????????????????????????????????false
   */
  each: function each(nodeList, fn) {
    var textNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var children = nodeList;
    for (var _i2 = 0; _i2 < children.length; _i2++) {
      if (textNode) {
        fn.call(null, children[_i2]);
      } else {
        if (children[_i2].nodeType === 1) {
          fn.call(null, children[_i2]);
        }
      }
    }
  },


  /** index
   * ??????????????????????????????????????????????????????
   * @param {Node} node ????????????
   * @param {boolean} textNode ????????????????????????????????????false
   * @returns ????????????????????????????????????????????????????????????1?????????
   */
  index: function index(node) {
    var textNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var index = 0,
        indexWithText = 0;
    children = node.parentNode.childNodes;
    for (var _i3 = 0; _i3 < children.length; _i3++) {
      indexWithText++;
      if (children[_i3].nodeType === 1) {
        index++;
      }
      if (children[_i3] === node) {
        break;
      }
    }
    return textNode ? indexWithText : index;
  }
};

console.log("iQuery????????????");
},{}],"../../../../../../.config/yarn/global/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '64748' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ??? Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] ????  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">????</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../../../.config/yarn/global/node_modules/parcel/src/builtins/hmr-runtime.js","iDom.js"], null)
//# sourceMappingURL=/iDom.c52d94fd.map