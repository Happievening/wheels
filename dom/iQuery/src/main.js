const dom = {
    create(string) {
      //template标签可以容纳任意元素
      const container = document.createElement("template");
      container.innerHTML = string;
      return container.children[0];
    },
  };
dom.create("<span>123</span>");
