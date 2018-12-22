# pick
A light-weight jQuery-like DOM library
1. Select element(s)
	- Class ? select all
	- Id ? still select all
	- tag ? create one
	- Multiple class/id/etc? select all (Ex: $('#side, .n1, span'))

2. Get (of 1st selected elt) and Set (all selected elts) attributes of selection
	- val
	- attr (standard/DOM recognised props like `id`)
	- prop (non-standard)
	- data
	- text
	- html

3. Class related methods:
	- addClass
	- removeClass
	- hasClass

4. Different initializations:
	- Selector (CSS Style): $('...') > Finds NodeList and converts to array 
		- If not found > Creates NodeList and converts to array
	- Single DOM element: $(HTMLElement) > Place it in a single element array
	- Multiple DOM elements: $(NodeList) > Convert NodeList to array
	- Nested Pick Objects: $($(...)) > Resolves to innermost Pick object

5. DOM Traversal: (On first matching element) (Only on element nodes)
	- parent()
	- closest(selector)
	- find(selector)
	- nextElement()
	- prevElement()

6. DOM Insertions/Manipulations:
	- append(String/Node/Pick)
	- prepend(String/Node/Pick)
	- after(String/Node/Pick)
	- before(String/Node/Pick)
	- remove()
	- replace(String/Node/Pick)

7. Iterating through:
	- each(callback)
	- first() // returns first element in a single element array (i.e as a Pick, not DOM)
	- last() // returns last element in a single element array (i.e as a Pick, not DOM)
	- get(i) // returns ith element in a single element array (i.e as a Pick, not DOM)

8. Event Listeners:
	- on(event, [target], [handler])
	- off(event, [handler])
	- once(event, [target], [handler])
	- trigger(event)

9. AJAX functionality with a promise:
	- ajax(url, method, options) ; options => {headers, body, credentials}
