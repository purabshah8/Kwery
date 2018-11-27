class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  html(string) {
    if (typeof string === 'undefined') {
      return this.nodes[0].innerHTML;
    } else {
      this.nodes.forEach( (node) => {
        node.innerHTML = string;
      });
    }
  }

  empty() {
    this.html("");
  }

  append(arg) {
    if (arg instanceof DOMNodeCollection) {
      this.nodes.forEach ( (domNode) => {
        arg.nodes.forEach ( (argNode) => {
          domNode.append(argNode.outerHTML);
        });
      });
    } else {
      this.nodes.forEach ( (node) => {
        node.append(arg.outerHTML);
      });
    }
  }

  attr(attributeName, value) {
    if (!value) {
      return this.nodes[0].getAttribute(attributeName);
    } else {
      this.nodes.forEach((node) => {
        node.setAttribute(attributeName, value);
      });
    }
  }

  addClass(classNames) {
    const classes = classNames.split(" ");
    this.nodes.forEach((node) =>{
      node.classList.add(...classes);
    });
  }

  removeClass(classNames) {
    const classes = classNames.split(" ");
    this.nodes.forEach((node) =>{
      node.classList.remove(...classes);
    });
  }

  children() {
    let children = [];

    this.nodes.forEach( (node) => {
      children = children.concat(Array.from(node.children));
    });
    return new DOMNodeCollection(children);
  }

  parent() {
    let parents = [];

    this.nodes.forEach ( (node) => {
      parents = parents.concat([node.parentElement]);
     });
    return new DOMNodeCollection(parents);
  }

  find(queryString) {
    let found = [];

    this.nodes.forEach ( (node) => {
      found = found.concat(node.querySelectorAll(queryString));
    });
    return found;
  }

  remove() {
    this.nodes.forEach ( (node) => {
      node.innerHTML = "";
    });
    this.nodes = [];
  }

  on(event, callback) {
    this.nodes.forEach ( (node) => {
      node.addEventListener(event, callback);
      node.callback = callback;
    });
  }

  off(event) {
    this.nodes.forEach ( (node) => {
      node.removeEventListener(event, node.callback);
    });
  }
}

module.exports = DOMNodeCollection;
