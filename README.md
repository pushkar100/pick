
# pick

A light-weight jQuery-like library, Pick, with chained methods and event handlers.

Minified file size: `~5Kb`

Gzipped file size: `~1.4Kb`

## Usage

**Selecting element(s)**

`$(selector)`

- Selector can be a `class` or `id` or an HTML tag name
- Returns an object containing all the matched DOM elements internally
- We can select a mix of DOM elements by passing different comma(,) separated selectors. Ex: `$('#side, .n1, span')`

**Valid Selectors**
- Classes. Example: `$('.main')`
- Id. Example: `$('#search')`
- DOM Element(s): `$(document.querySelector('.main'))`, `$(document.querySelectorAll('span'))`, and so on
- Another Pick element, nested: `$($(document.querySelector('span')))`
- NodeLists: `$(<A-NodeList>)` Converts a NodeList to an array

**Methods: Properties & Values**

- `.val()`: Gets the value of the first matched element
- `.val(<value>)`: Sets the value of all matched elements

- `.attr('<attribute>')`: Gets the standard attributes (like `id`) of first matched element
- `.attr('<attribute>', <value>)`: Sets the standard attributes (like `id`) of all the matched elements

- `.prop('<name>')`: Gets the non-standard properties of first matched element
- `.prop('<name>', <value>)`: Sets the non-standard properties of all the matched element

- `.data('<name>')`: Gets the data attribute (mentioned in `data-*`) of the first matched element
- `.data('<name>', <value>)`: Sets the data attribute (mentioned in `data-*`) of all matched elements

- `.text()`: Gets the text of the first matched element
- `.text(<value>)`: Sets the text of all the matched elements

- `.html()`: Gets the HTML of the first matched element
- `.html(<value>)`: Sets the HTML of all the matched elements

All the *set* methods return the Pick object itself and hence, can be chained.

**Methods: Class related**

- `.addClass('<space-separated-class-names>')`: Adds the listed class names to all the selected elements
- `.removeClass('<space-separated-class-names>')`: Removes the listed class names from all the selected elements
- `.hasClass('<class-name>')`: Returns true if the first matched element has the specified class

Except for `.hasClass()`, the remaining two methods return the Pick object and can be chained

**Methods: DOM Traversal: Only on first matching element**

- `.parent()`: Returns the parent element of first matched element as a Pick object
- `.closest(<selector>)`: Returns the closest ancestor, matching the selector, of the first matched element as a Pick object, else empty array `[]`
- `.find(<selector>)`: Returns the Pick object containing all the child elements that matching the selector, w.r.t the first matched element, else empty Pick object with `0` DOM elements
- `.nextElement()`: Returns the next element of the first matched element
- `.prevElement()`: Returns the previous element of the first matched element

** Methods: DOM Insertions & Manipulations**

- `.append(<String/Node/Pick>)`: Appends element to all matched elements
- `.prepend(String/Node/Pick)`: Prepends element to all matched elements
- `.after(String/Node/Pick)`: Inserts element after each matched element
- `.before(String/Node/Pick)`: Inserts element before each matched element
- `.remove()`: Removes each matched element from the DOM
- `replace(String/Node/Pick)`: Replaces each matched element with element passed as argument

All these methods can be chained

**Methods: Iterating through**

- `.each(<callback>)`: Runs a callback on each of the matched elements. `<callback>` is a function that receives reference to each DOM element as first argument 
- `.first()`: Returns the first element as a single element array (i.e as a Pick object, not DOM)
- `.last()`:  Returns the last element as a single element array (i.e as a Pick object, not DOM)
- `.get(<index>)` Returns `index`th element as a single element array (i.e as a Pick object, not DOM)

**Methods: Event Listeners**

- `.on(event, [target], [handler])`: Initializes an event on the matched elements, or on the `target` of each element if it is specified, while passing the `handler`  callback to be run on trigger of that event
- `.off(event, [handler])`: Removes an event listener from all matched elements. If `handler` callback is specified, it removes only those events from all matched elements that were initialized with this callback 
- `.once(event, [target], [handler])`: Similar to `.on()` but the event handler can be triggered only once. After the first trigger, the event and handler is removed automatically
- `.trigger(event)`: Triggers an event on all the matched elements

All these methods can be chained

**Methods: AJAX functionality with a promise**

- `$.ajax(url, method, options)` : Performs an XHR Request. Built using `fetch` API of JavaScript. The `url` is any valid URL, `method` is one of the HTTP methods (`get`, `post`, `put`, etc).  `options` is an object that can contain additional information like `headers`, `body`, `credentials`, etc.
