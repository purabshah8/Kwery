const DOMNodeCollection = require('./dom_node_collection.js');

const $k = (arg) => {
  const toExecute = [];
  if (arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg]);
  } else if (typeof arg === "string") {
    const nodes = document.querySelectorAll(arg);
    const nodesArr = Array.from(nodes);
    return new DOMNodeCollection(nodesArr);
  } else if (arg instanceof Function) {
    toExecute.push(arg);
    let stateCheck = setInterval(() => {
      if (document.readyState === 'complete') {
        clearInterval(stateCheck);
        toExecute.forEach((func) => func());
      }
    }, 100);
  }
};

$k.extend = function (firstObject, ...objects) {
  const merged = Object.assign(firstObject, ...objects);
  return merged;
};

$k.ajax = function (options) {
  let defaultObject = {
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    url: "",
    method: 'GET',
    success: () => console.log("Success!!!!"),
    error: () => console.log("An error occurred.")
  };

  options = Object.assign(defaultObject, options);
  const xhr = new XMLHttpRequest();

  if (options.method === "GET") {
    options.url += `${toQueryString(options.data)}`;
  }

  xhr.open(options.method, options.url);
  xhr.onload = function (e) {
    const jsonResponse = JSON.parse(xhr.response);
    if (xhr.status === 200) {
      options.success(jsonResponse);
    } else {
      options.error(jsonResponse);
    }
  };
  xhr.send(JSON.stringify(options.data));
};

const toQueryString = (obj) => {
  let queryString = "?";
  for (let i = 0; i < Object.keys(obj).length; i++) {
    const key = Object.keys(obj)[i];
    const data = obj[key];
    queryString += `${key}=${data}&`;
  }
  if (queryString.length > 1)
    return queryString.slice(0, queryString.length-1);
  else return "";
};

module.exports = $k;