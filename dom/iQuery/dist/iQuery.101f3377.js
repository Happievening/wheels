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
})({"iQuery.js":[function(require,module,exports) {
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

window.dom = {
  /** create
   * 创建可嵌套的标签
   * @param {string} string 标签字符串
   * @returns 返回值：创建的嵌套元素的第一个子标签
   */
  create: function create(string) {
    //template标签可以容纳任意元素，不过其中的元素不能通过DOM直接获得
    var container = document.createElement("template");
    //去除字符串中的所有空格
    container.innerHTML = string.trim();
    return container.content.firstChild;
  },


  /** after
   * 在定位节点后插入新的兄弟节点
   * DOM提供的insertBefore需要知道定位节点的父节点
   * @param {Node} nodeForPositioning 定位节点
   * @param {Node} nodeToInsert 要插入的节点
   * @returns
   * @example dom.after(node1, node2)
   */
  after: function after(nodeForPositioning, nodeToInsert) {
    nodeForPositioning.parentNode.insertBefore(nodeToInsert, nodeForPositioning.nextSibling);
  },


  /** before
   * 在定位节点前插入新的兄弟节点
   * DOM提供的insertBefore需要知道定位节点的父节点
   * @param {Node} nodeForPositioning 定位节点
   * @param {Node} nodeToInsert 要插入的节点
   * @returns
   * @example dom.before(node1, node2)
   */
  before: function before(nodeForPositioning, nodeToInsert) {
    nodeForPositioning.parentNode.insertBefore(nodeToInsert, nodeForPositioning);
  },


  /** append
   * 在父节点下插入新的子节点
   * @param {Node} parentNode 父节点
   * @param {Node} childNode 要插入的子节点
   * @returns
   */
  append: function append(parentNode, childNode) {
    return parentNode.appendChild(childNode);
  },


  /** wrap
   * 将一个节点node移动到新的父节点parent下
   * @param {Node} childNode 要移动的子节点
   * @param {Node} parentNode 新的父节点
   * @returns
   */
  wrap: function wrap(childNode, parentNode) {
    dom.before(childNode, parentNode);
    dom.append(parentNode, childNode);
  },


  /** remove
   * 删除一个节点,DOM同时移除其下的所有子节点，包括文本节点
   * @param {Node} node 要删除的节点
   * @returns 返回值：被删除的节点
   */
  remove: function remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },


  /** empty
   * 删除一个节点的所有子节点，但是保留该节点本身
   * @param {Node} node 要操作的节点
   * @param {boolean} text 是否删除这个节点本身的文本节点，默认为false
   * @returns 返回值：被删除的子节点构成的数组
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
   * 根据参数个数不同，修改或者获取一个节点的属性
   * @param {*} node 一个节点
   * @param {*} name 属性名
   * @param {*} value 属性值
   * 如果没有传递属性值，则获取对应属性的值；如果有传递属性值，则将属性的值修改为该值
   * @returns 2个参数时：获取到的属性值；3个参数时：修改后的节点
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
   * 根据参数个数不同，修改或者获取一个节点下的文本节点内容
   * @param {Node} node 一个节点
   * @param {string} value 新的文本内容
   * 如果没有传递value，则获取当前文本节点内容；如果有传递value，则将文本节点内容修改为该内容
   * @returns 1个参数时：获取到的文本；2个参数时：修改后的节点
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
   * 根据参数个数不同，修改或者获取一个节点下的HTML节点内容
   * @param {Node} node 一个节点
   * @param {string} value 新的HTML内容
   * 如果没有传递value，则获取当前HTML节点内容；如果有传递value，则将HTML节点内容修改为该内容
   * @returns 1个参数时：获取到的HTML；2个参数时：修改后的节点
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
   * 功能1: 输入一个键字符串，获取一个节点的style对象中这个键对应的值
   * 功能2: 输入一个键字符串和一个值字符串，修改一个节点的style对象中的对应键值对。
   * 功能3: 输入一个对象，修改一个节点的style对象中的所有对应键值对。
   * @param {Node} node 一个节点
   * @param {Parameter} value 一个valueObject对象的键值对；或者一个键；或者一个键和一个值
   * @returns 功能2，3: 一个键字符串和一个值字符串 => 修改后的节点; 功能1： style对象中这个键的值
   * @examples 功能1使用例：dom.style(s1, "border")
   * @examples 功能2使用例：dom.style(s1, "border", "1px solid red")
   * @examples 功能3使用例：dom.style(s1, {"border":"1px solid blue", "color":"pink"})
   */
  style: function style(node) {
    for (var _len = arguments.length, value = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      value[_key - 1] = arguments[_key];
    }

    if (value.length === 1) {
      //对象时使用功能3
      if (value[0].constructor === Object) {
        //in语法遍历所有的键
        for (i in value[0]) {
          node.style[i] = value[0][i];
        }
        return node;
      } else if (value[0].constructor === String) {
        //字符串时使用功能1
        return node.style[value[0]];
      }
    } else if (value.length === 2) {
      //功能2
      node.style[value[0]] = value[1];
      return node;
    }
  },


  /** addClass
   * 为一个节点添加class。多个class用逗号隔开。
   * @param {Node} node 一个节点
   * @param {...Parameters} newClass 多个class构成的数组
   * @returns 修改后的节点
   */
  addClass: function addClass(node) {
    var _node$classList;

    for (var _len2 = arguments.length, newClass = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      newClass[_key2 - 1] = arguments[_key2];
    }

    //将newClass展开为参数集
    (_node$classList = node.classList).add.apply(_node$classList, _toConsumableArray(newClass));
    return node;
  },


  /** removeClass
   * 为一个节点移除class。多个class用逗号隔开。
   * @param {Node} node 一个节点
   * @param {...Parameters} classToRemove 要移除的class
   * @returns 修改后的节点
   */
  removeClass: function removeClass(node) {
    var _node$classList2;

    for (var _len3 = arguments.length, classToRemove = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      classToRemove[_key3 - 1] = arguments[_key3];
    }

    //将classToRemove展开为参数集
    (_node$classList2 = node.classList).remove.apply(_node$classList2, _toConsumableArray(classToRemove));
    return node;
  },


  //提供一个综合的class对象实现上述添加移除的操作
  class: {
    add: function add(node) {
      var _node$classList3;

      for (var _len4 = arguments.length, newClass = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        newClass[_key4 - 1] = arguments[_key4];
      }

      //将newClass展开为参数集
      (_node$classList3 = node.classList).add.apply(_node$classList3, _toConsumableArray(newClass));
      return node;
    },
    remove: function remove(node) {
      var _node$classList4;

      for (var _len5 = arguments.length, classToRemove = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        classToRemove[_key5 - 1] = arguments[_key5];
      }

      //将classToRemove展开为参数集
      (_node$classList4 = node.classList).remove.apply(_node$classList4, _toConsumableArray(classToRemove));
      return node;
    }
  },

  /** on
   * 给一个节点绑定事件
   * @param {node} 待绑定事件的节点
   * @param {event} 触发事件
   * @param {fn} 回调函数
   * @returns
   */
  on: function on(node, event, fn) {
    return node.addEventListener(event, fn);
  },


  /** off
   * 移除一个事件的绑定函数
   * @param {node} 绑定了事件的节点
   * @param {event} 事件
   * @param {fn} 回调函数
   * @returns
   */
  off: function off(node, event, fn) {
    return node.removeEventListener(event, fn);
  },


  /** find
   * 选择特定的节点，只能选择标签类节点
   * @param {string} CSS形式的选择器
   * @param {range} 可以预先指定一个有id属性的节点作为查找范围
   * @returns NodeList
   */
  find: function find(selector) {
    var range = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

    return range.querySelectorAll(selector);
  },


  /** parent
   * 选择特定的节点的父节点
   * @param {string} CSS形式的选择器
   * @param {range} 可以预先指定一个有id属性的节点作为查找范围
   * @returns 父节点
   */
  parent: function parent(node) {
    return node.parentNode;
  },


  /** children
   * 获取特定的节点的所有子节点，
   * @param {Node} node 一个节点
   * @param {boolean} textNode 是否考虑文本节点，默认为false
   * @returns 所有子节点构成的伪数组
   */
  children: function children(node) {
    var textNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    return textNode ? node.childNodes : node.children;
  },


  /** siblings
   * 获取一个节点的所有兄弟节点
   * @param {Node} node 要操作的节点
   * @param {boolean} textNode 是否考虑文本节点，默认为false
   * @returns 所有兄弟节点组成的数组
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
   * 获取一个节点的下一个兄弟节点
   * @param {Node} node 要操作的节点
   * @param {boolean} textNode 是否考虑文本节点，默认为false
   * @returns 下一个节点
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
   * 获取一个节点的上一个兄弟节点
   * @param {Node} node 要操作的节点
   * @param {boolean} textNode 是否考虑文本节点，默认为false
   * @returns 上一个节点
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
   * 遍历一个节点下的所有子节点，每次遍历到新元素可以对该元素执行一个函数
   * @param {*} nodeList 节点组成的数组或伪数组
   * @param {*} fn 回调函数
   */
  each: function each(nodeList, fn) {
    var textNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var children = nodeList;
    for (var _i2 = 0; _i2 < children.length; _i2++) {
      fn.call(null, children[_i2]);
    }
  },


  /** index
   * 计算该节点是其父节点下的第几个子节点
   * @param {Node} node 一个节点
   * @param {boolean} textNode 是否考虑文本节点，默认为false
   * @returns 该节点是其父节点下的第几个子节点，计数从1开始。
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

console.log("iQuery加载完毕");
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '52557' + '/');
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
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

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

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

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
},{}]},{},["../../../../../../.config/yarn/global/node_modules/parcel/src/builtins/hmr-runtime.js","iQuery.js"], null)
//# sourceMappingURL=/iQuery.101f3377.map