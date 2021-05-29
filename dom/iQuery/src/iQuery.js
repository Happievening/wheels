window.dom = {
  /**
   * 创建可嵌套的标签
   * @param {String} string 标签字符串
   * @returns 创建的嵌套元素的第一个子标签
   */
  create(string) {
    //template标签可以容纳任意元素，不过其中的元素不能通过DOM直接获得
    const container = document.createElement("template");
    //去除字符串中的所有空格
    container.innerHTML = string.trim();
    return container.content.firstChild;
  },
  /**
   * 在一个节点后插入新的节点
   * @param {Node} node1 原标签
   * @param {Node} node2 要插入的标签
   */
  after(node1, node2) {
    node1.parentNode.insertBefore(node2, node1);
  },
};

console.log("iQuery加载完毕");
