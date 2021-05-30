window.dom = {
  /** create
   * 创建可嵌套的标签
   * @param {string} string 标签字符串
   * @returns 返回值：创建的嵌套元素的第一个子标签
   */
  create(string) {
    //template标签可以容纳任意元素，不过其中的元素不能通过DOM直接获得
    const container = document.createElement("template");
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
  after(nodeForPositioning, nodeToInsert) {
    nodeForPositioning.parentNode.insertBefore(
      nodeToInsert,
      nodeForPositioning.nextSibling
    );
  },

  /** before
   * 在定位节点前插入新的兄弟节点
   * DOM提供的insertBefore需要知道定位节点的父节点
   * @param {Node} nodeForPositioning 定位节点
   * @param {Node} nodeToInsert 要插入的节点
   * @returns
   * @example dom.before(node1, node2)
   */
  before(nodeForPositioning, nodeToInsert) {
    nodeForPositioning.parentNode.insertBefore(
      nodeToInsert,
      nodeForPositioning
    );
  },

  /** append
   * 在父节点下插入新的子节点
   * @param {Node} parentNode 父节点
   * @param {Node} childNode 要插入的子节点
   * @returns
   */
  append(parentNode, childNode) {
    return parentNode.appendChild(childNode);
  },

  /** wrap
   * 将一个节点node移动到新的父节点parent下
   * @param {Node} childNode 要移动的子节点
   * @param {Node} parentNode 新的父节点
   * @returns
   */
  wrap(childNode, parentNode) {
    dom.before(childNode, parentNode);
    dom.append(parentNode, childNode);
  },

  /** remove
   * 删除一个节点,DOM同时移除其下的所有子节点，包括文本节点
   * @param {Node} node 要删除的节点
   * @returns 返回值：被删除的节点
   */
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },

  /** empty
   * 删除一个节点的所有子节点，但是保留该节点本身
   * @param {Node} node 要操作的节点
   * @param {boolean} text 是否删除这个节点本身的文本节点，默认为false
   * @returns 返回值：被删除的子节点构成的数组
   */
  empty(node, text = false) {
    //const childNodes = node.childNodes;
    const { childNodes } = node;
    const array = [];
    const length = childNodes.length;
    for (let i = text ? 0 : 1; i < length; i++) {
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
  attr(node, name, value) {
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
  text(node, value) {
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
  html(node, value) {
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
  style(node, ...value) {
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
      return node
    }
  },

  /** addClass
   * 为一个节点添加class。多个class用逗号隔开。
   * @param {Node} node 一个节点
   * @param {...Parameters} newClass 多个class构成的数组
   * @returns 修改后的节点
   */
  addClass(node, ...newClass) {
    //将newClass展开为参数集
    node.classList.add(...newClass);
    return node;
  },

  /** removeClass
   * 为一个节点移除class。多个class用逗号隔开。
   * @param {Node} node 一个节点
   * @param {...Parameters} classToRemove 要移除的class
   * @returns 修改后的节点
   */
  removeClass(node, ...classToRemove) {
    //将classToRemove展开为参数集
    node.classList.remove(...classToRemove);
    return node;
  },

  //提供一个综合的class对象实现上述添加移除的操作
  class: {
    add(node, ...newClass) {
      //将newClass展开为参数集
      node.classList.add(...newClass);
      return node;
    },
    remove(node, ...classToRemove) {
      //将classToRemove展开为参数集
      node.classList.remove(...classToRemove);
      return node;
    },
  },

  /** on
   * 给一个节点绑定事件
   * @param {node} 待绑定事件的节点
   * @param {event} 触发事件
   * @param {fn} 回调函数
   * @returns
   */
  on(node, event, fn) {
    return node.addEventListener(event, fn);
  },

  /** off
   * 移除一个事件的绑定函数
   * @param {node} 绑定了事件的节点
   * @param {event} 事件
   * @param {fn} 回调函数
   * @returns
   */
  off(node, event, fn) {
    return node.removeEventListener(event, fn);
  },

  /** find
   * 选择特定的节点，只能选择标签类节点
   * @param {string} CSS形式的选择器
   * @param {range} 可以预先指定一个有id属性的节点作为查找范围
   * @returns NodeList
   */
  find(selector, range = document) {
    return range.querySelectorAll(selector);
  },

  /** parent
   * 选择特定的节点的父节点
   * @param {string} CSS形式的选择器
   * @param {range} 可以预先指定一个有id属性的节点作为查找范围
   * @returns 父节点
   */
  parent(node) {
    return node.parentNode;
  },

  /** children
   * 获取特定的节点的所有子节点，
   * @param {Node} node 一个节点
   * @param {boolean} textNode 是否考虑文本节点，默认为false
   * @returns 所有子节点构成的伪数组
   */
  children(node, textNode = false) {
    return textNode ? node.childNodes : node.children;
  },

  /** siblings
   * 获取一个节点的所有兄弟节点
   * @param {Node} node 要操作的节点
   * @param {boolean} textNode 是否考虑文本节点，默认为false
   * @returns 所有兄弟节点组成的数组
   */
  siblings(node, textNode = false) {
    if (textNode) {
      return Array.from(node.parentNode.childNodes).filter((n) => n !== node);
    } else {
      return Array.from(node.parentNode.children).filter((n) => n !== node);
    }
  },

  /** next
   * 获取一个节点的下一个兄弟节点
   * @param {Node} node 要操作的节点
   * @param {boolean} textNode 是否考虑文本节点，默认为false
   * @returns 下一个节点
   */
  next(node, textNode = false) {
    if (textNode) {
      return node.nextSibling;
    } else {
      let next = node.nextSibling;
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
  previous(node, textNode = false) {
    if (textNode) {
      return node.previousSibling;
    } else {
      let prev = node.previousSibling;
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
  each(nodeList, fn, textNode = false) {
    let children = nodeList;
    for (let i = 0; i < children.length; i++) {
      fn.call(null, children[i]);
    }
  },

  /** index
   * 计算该节点是其父节点下的第几个子节点
   * @param {Node} node 一个节点
   * @param {boolean} textNode 是否考虑文本节点，默认为false
   * @returns 该节点是其父节点下的第几个子节点，计数从1开始。
   */
  index(node, textNode = false) {
    let index = 0,
      indexWithText = 0;
    children = node.parentNode.childNodes;
    for (let i = 0; i < children.length; i++) {
      indexWithText++;
      if (children[i].nodeType === 1) {
        index++;
      }
      if (children[i] === node) {
        break;
      }
    }
    return textNode ? indexWithText : index;
  },
};

console.log("iQuery加载完毕");
