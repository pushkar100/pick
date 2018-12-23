function Pick(selector) {
    if (selector instanceof HTMLElement)
        this.elements = [selector];
    else if (selector instanceof NodeList)
        this.elements = [...(Array.from(selector))];
    else if (selector instanceof Array)
        this.elements = selector;
    else if (selector instanceof Pick)
        return selector;
    else if (selector === document)
        this.elements = [document];
    else {
        this.selector = selector.trim();
        if (this.selector) {
            let _el = document.querySelectorAll(this.selector);
            if (_el.length) {
                this.elements = Array.from(_el);
            } else {
                /* https://stackoverflow.com/questions/35969843/how-to-create-nodelist-object-from-two-or-more-domnodes */
                try {
                    this.elements = Array.from(createNodeList(this.selector));
                } catch (e) {
                    this.elements = [];
                    // throw `Cannot create element: ${e}`;
                }
            }
        }
    }

    /* Inner functions */
    function createNodeList(selector) {
        let _docFrag = document.createDocumentFragment();
        _docFrag.appendChild(document.createElement(selector));
        return _docFrag.querySelectorAll('*');
    }
}

Pick.prototype = {
    val(value = undefined) {
        if (value !== undefined) { // set
            this.elements.forEach(_el => _el.value = value);
            return this;
        } else { // get (1st)
            let _firstEl = this.getFirstDOMElement();
            return _firstEl && _firstEl.value;
        }
    },
    attr(name, value = undefined) {
        if (value != undefined) { // set
            this.elements.forEach(_el => _el.setAttribute(name, value));
            return this;
        } else { // get (1st)
            let _firstEl = this.getFirstDOMElement();
            return _firstEl && _firstEl.getAttribute(name);
        }
    },
    prop(name, value = undefined) {
        if (value != undefined) { // set
            this.elements.forEach(_el => _el[name] = value);
            return this;
        } else { // get (1st)
            let _firstEl = this.getFirstDOMElement();
            return _firstEl && _firstEl[name];
        }
    },
    data(name, value = undefined) {
        if (value != undefined) { // set
            this.elements.forEach(_el => _el.setAttribute(`data-${name}`, value));
            return this;
        } else { // get (1st)
            let _firstEl = this.getFirstDOMElement();
            return _firstEl && _firstEl.getAttribute(`data-${name}`);
        }
    },
    text(value = undefined) {
        if (value !== undefined) { // set
            this.elements.forEach(_el => _el.textContent = value);
            return this;
        } else { // get (1st)
            let _firstEl = this.getFirstDOMElement();
            return _firstEl && _firstEl.textContent;
        }
    },
    html(value = undefined) {
        if (value !== undefined) { // set
            this.elements.forEach(_el => _el.innerHTML = value);
            return this;
        } else { // get (1st)
            let _firstEl = this.getFirstDOMElement();
            return _firstEl && _firstEl; // Return DOM rep. of _firstEl.innerHTML
        }
    },
    addClass(classes) {
        classes = classes.split(' ');
        this.elements.forEach(_el => _el.classList.add(...classes));
        return this;
    },
    removeClass(classes) {
        classes = classes.split(' ');
        this.elements.forEach(_el => _el.classList.remove(...classes));
        return this;
    },
    hasClass(thisClass) { // IMP: Check is for first matching element only
        return this.getFirstDOMElement().classList.contains(thisClass);
    },
    parent() { // Only on first matching element
        let _curEl = this.getFirstDOMElement();
        return $(_curEl.parentElement);
    },
    closest(classIdOrTag) { // Only on first matching element
        classIdOrTag = classIdOrTag.trim();
        let _type = classIdOrTag[0];
        let _curEl = this.getFirstDOMElement().parentElement;
        while (_curEl !== null) {
            if (_type === '.') {
                if (_curEl.classList.contains(classIdOrTag.slice(1)))
                    break;
            } else if (_type === '#') {
                if (_curEl.id === classIdOrTag.slice(1))
                    break;
            } else {
                if (_curEl.tagName === classIdOrTag.toUpperCase())
                    break;
            }
            _curEl = _curEl.parentElement;
        }
        return _curEl !== null ? $(_curEl) : [];
    },
    find(classIdOrTag) {
        classIdOrTag = classIdOrTag.trim();
        let _type = classIdOrTag[0];
        let _els = Array.from(this.getFirstDOMElement().children);
        let j = 0;
        let _matches = [];
        while (_els[j]) {
            if (identified(_els[j]))
                _matches.push(_els[j]);
            _els.push(...Array.from(_els[j].children));
            j++;
        }

        return $(_matches);

        /* Inner Functions: */
        function identified(el) {
            if (_type === '.') {
                if (el.classList.contains(classIdOrTag.slice(1)))
                    return true;
            } else if (_type === '#') {
                if (el.id === classIdOrTag.slice(1))
                    return true;
            } else {
                if (el.tagName === classIdOrTag.toUpperCase())
                    return true;
            }
            return false;
        }
    },
    nextElement() { // Only on first matched element
        return $(this.getFirstDOMElement().nextElementSibling);
    },
    prevElement() { // Only on first matched element
        return $(this.getFirstDOMElement().previousElementSibling);
    },
    append(strNodeYEltArray) { // Only on first matched element
        let _domEls = this.convertToDOMArray(strNodeYEltArray);
        let _curEl = this.getFirstDOMElement();
        _domEls.forEach(dE => _curEl.appendChild(dE));
        return this;
    },
    prepend(strNodeYEltArray) { // Only on first matched element
        let _domEls = this.convertToDOMArray(strNodeYEltArray).reverse();
        let _curEl = this.getFirstDOMElement();
        _domEls.forEach(dE => {
            _curEl.insertBefore(dE, _curEl.children[0]);
        });
        return this;
    },
    after(strNodeYEltArray) { // Only on first matched element
        let _domEls = this.convertToDOMArray(strNodeYEltArray);
        let _parent = this.parent().getFirstDOMElement();
        let _nextEl = this.nextElement().getFirstDOMElement();
        _domEls.forEach(dE => {
            _parent.insertBefore(dE, _nextEl);
        });
        return this;
    },
    before(strNodeYEltArray) { // Only on first matched element
        let _domEls = this.convertToDOMArray(strNodeYEltArray);
        let _parent = this.parent().getFirstDOMElement();
        let _curEl = this.getFirstDOMElement();
        _domEls.forEach(dE => {
            _parent.insertBefore(dE, _curEl);
        });
        return this;
    },
    remove() { // Only on first matched element
        let _parent = this.parent().getFirstDOMElement();
        let _curEl = this.getFirstDOMElement();
        return _parent.removeChild(_curEl);
    },
    replace(strNodeYEltArray) { // Only on first matched element
        this.after(strNodeYEltArray);
        this.remove();
    },
    each(cb) { // `cb(el) { ... }`
        if (typeof cb === 'function') {
            this.elements.forEach(el => {
                cb.apply(null, [el]);
            });
        }
    },
    first() {
        return $(this.getFirstDOMElement());
    },
    last() {
        return $(this.getLastDOMElement());
    },
    get(i) {
        return $(this.elements[i]);
    },
    once(event, target = undefined, callback = undefined) {
        if (typeof target === 'string') {
            this.each(el => {
                $(el).find(target).once(event, callback);
            });
        } else if (typeof target === 'function') {
            callback = target;
            this.each(el => el.addEventListener(event, handler));
        }
        return this;
        /* Inner functions: */
        function handler(e) {
            callback(e);
            e.target.removeEventListener(e.type, arguments.callee);
        }
    },
    on(event, target = undefined, callback = undefined) {
        if (typeof target === 'string') {
            this.each(el => {
                $(el).find(target).on(event, callback);
            });
        } else if (typeof target === 'function') {
            callback = target;
            this.each(el => {
                eventsList.push([el, callback]);
                el.addEventListener(event, callback);
            });
        }
        return this;
    },
    off(event, target = undefined, callback = undefined) { // If !callback, remove all 'event' events irrespective of callback
        if (typeof target === 'string') {
            this.each(el => {
                $(el).find(target).off(event, callback);
            });
        } else {
            callback = target;
            this.each(el => {
                let i = 0;
                while (eventsList[i]) {
                    if (eventsList[i][0] === el) {
                        if (typeof callback !== 'function')
                            el.removeEventListener(event, eventsList[i][1]);
                        else {
                            if (eventsList[i][1] === callback)
                                el.removeEventListener(event, callback);
                        }
                        eventsList.splice(i, 1);
                    }
                    i++;
                }
            });
        }
        return this;
    },
    trigger(event) {
        this.each(el => el.dispatchEvent(new Event(event)));
        return this;
    },
    /* Below: Utility functions */
    getFirstDOMElement() {
        return this.elements[0];
    },
    getLastDOMElement() {
        return this.elements[this.elements.length - 1];
    },
    convertToDOMArray(item) {
        if (typeof item === 'string') {
            let x = document.createElement('div');
            x.innerHTML = item;
            return Array.from(x.children);
        } else if (item instanceof HTMLElement)
            return [item];
        else if (item instanceof NodeList)
            return Array.from(item);
        else if (item instanceof Array)
            return item;
        else if (item instanceof Pick)
            return item.elements;
        else if (selector === document)
            return [document];
        return [];
    }
}

/* Store event handler info here: */
let eventsList = [];
let $ = selector => {
    var e = new Pick(selector);
    return e;
};

/* XML HTTP Request functionality: */
$.ajax = (url, method, options) => {
    let fetchObj = {};
    fetchObj['method'] = method || 'get';
    if (typeof options === 'object') {
        if (typeof options['headers'] === "object")
            fetchObj['headers'] = options.headers; // Ex: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" }
        if (typeof options['body'] === "object")
            fetchObj['body'] = serialize(options.body);
        if (options['credentials'])
            fetchObj['credentials'] = options.credentials;
        if (options['mode'])
            options['mode'] = 'cors'; // Request server to allow CORS mode (so that server allows it [but browser can still block])
    }

    return fetch(url, fetchObj);

    /* Inner functions: */
    function serialize(obj) {
        let str = '';
        for (var key in obj) {
            if (str !== '')
                str += '&';
            str += key + '=' + encodeURIComponent(obj[key]);
        }
        return str;
    }
};

/* Make visible as a window property (for non-module [browser] use) */
if(typeof window === 'object')
    window.$ = $;
if(typeof global === 'object')
    global.$ = $;
if(typeof globalThis === 'object')
    globalThis.$ = $;

/* Export */
export {
    $ as default
};