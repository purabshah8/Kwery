# kwery

kwery is a simple JavaScript library for DOM manipulation & AJAX requests. It allows users to:
    * select one or more DOM elements
    * traverse the DOM to find and edit elements and their parents/children
    * add event handlers to DOM elements
    * return a callback when document is loaded
    * make AJAX requests, returning a promise


## Getting Started

The simplest way to get started with kwery is to embed the js file in your html as shown below:
```html
<head>
    <meta charset="UTF-8">
    <title>Page Title</title>
    <script src="./kwery.js" />
    ...
</head>
```

## Uses

### `$k`

The kwery library utilizes `$k` as its sole, global, variable. Fundamentally, the variable returns a wrapper for HTML elements, the `DOMNodeCollection`, but that is only part of its features. `$k`'s uses include:

#### Select Elements
```js
// divContainers is an array of DOMNodeCollection objects of divs with class container in the HTML
const $divContainers = $k('div.container');
```

#### Create DOMNodeCollection
```js
// create a new DOMNodeCollection Object
const $newDiv = $k('<div></div>');

// append newly created object as a child of $oldDiv
const $oldDiv = $k('#some-div');
$oldDiv[0].append($newDiv);
```

#### Traverse & Modify DOM Nodes

DOMNodeCollection objects have several methods to traverse & manipulate the DOM objects they wrap around.

##### Traversal
* `children`
    * Return a `DOMNodeCollection` of all the children of the all nodes in the array.
* `parent`
    * Return a `DOMNodeCollection` of the node's parent.
* `find`
    * Return an array of all descendent nodes of the node that matches the selector argument.

##### Manipulation
* `html`
    * Set the argument passed to it as the `innerHTML` of each node in the array. When no argument is given, return the `innerHTML` of the first node in the array.
* `empty`
    * Clear contents of all nodes in the array
* `append`
    * Append the `outerHTML` of each element in the argument to the `innerHTML` of each element in the `DOMNodeCollection`. See above for example.
* `attr`
    * With 1 argument, return the attribute of the node the method is called on; with 2 arguments set the value of the attribute passed to it.
* `addClass`
    * Add one or more classes to the node.
* `removeClass`
    * Remove one or more classes from the node.
* `remove`
    * Remove the html of all nodes in the array AND remove all nodes in the array.


#### Event Handling
```js
// the on function for DOMNodeCollection objects invokes the callback passed to it when the event occurs
$("#item-1").on('click', () => (alert('added to cart!')));

// the off function removes the eventListener for the DOMNodeCollection object
$("#item-1").off('click', () => (alert('added to cart!')));

// this is a special event handler, the callback occurs when the DOM is loaded on the webpage
$(() => (console.log('Hello World!')));
```

#### AJAX Requests
```js
// create an AJAX request, with required url, default method GET & optional data attribute
const updateUser = (user) => {
    return $k.ajax({
        method: "PATCh",
        url: "/users/4",
        data: { user },
    })
}
const modifiedUser = { age: 23, email: "someone@example.com"};

// Invoking the AJAX request returns a promise object, which takes a callback as its argument to execute on fulfillment, and optionally a callback that executes on rejection
updateUser(modifiedUser).then(
    (updatedUser) => (console.log(`Updated user ${updatedUser.id}`)),
    (error) => (console.log(error))
);

```


## Example

An example using the kwery library can be found here