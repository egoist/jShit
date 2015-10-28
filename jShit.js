(function (W, D) {
  var jShit = {}
  jShit.$ = D.querySelector.bind(D)
  jShit.$$ = D.querySelectorAll.bind(D)
  jShit.dom = function (el) {
    return new DOM(el)
  }

  function DOM (el) {
    this.name = el
    el = $$(el)
    if (!el) {
      console.error('cannot find element', el)
      return
    }
    this.el = el
  }

  DOM.prototype = {
    constructor: DOM,
    each: function (els, fn) {
      if (typeof els === 'function') {
        fn = els
        els = this.el
      }
      if (checkDOMType(els, 'NodeList')) {
        Array.prototype.forEach.call(els, fn)
      } else {
        fn(this.els)
      }
      return this
    },
    find: function (selector) {
      this.el = this.el[0].querySelectorAll(selector)
      return this
    },
    attr: function (key, value) {
      if (key && value || key && Boolean(value) === value) {
        this.el[0].setAttribute(key, value)
        return this
      } else {
        var attr = this.el[0].getAttribute(key)

        if (attr === 'true') {
          return true
        } else if (attr === 'false') {
          return false
        }

        return attr
      }
    },
    addClass: function (classList) {
      this.each(this.el, function (el) {
        el.className = el.className ? el.className + ' ' + classList : classList

      }.bind(this))
      return this
    },
    removeClass: function (classList) {
      this.each(this.el, function (el) {
        if (!el.className) {
          return
        }
        classList = classList.split(' ')
        classList.forEach(function (className) {
          if (el.classList.contains(className)) {
            el.classList.remove(className)
          }
        }.bind(this))
      }.bind(this))
      return this
    },
    toggleClass: function (classList) {
      classList = classList.split(' ')
      this.each(this.el, function (el) {
        classList.forEach(function (className) {
          if (el.classList.contains(className)) {
            el.classList.remove(className)
          } else {
            el.classList.add(className)
          }
        }.bind(this))
      }.bind(this))
      return this
    },
    remove: function () {
      this.each(this.el, function (el) {
        el.parentNode.removeChild(el)
      }.bind(this))
      return this
    },
    insertHTML: function (html, type) {
      this.each(this.el, function (el) {
        if (type === 'append') {
          el.innerHTML = el.innerHTML + html
        } else if (type === 'prepend') {
          el.innerHTML = html + el.innerHTML
        }
      }.bind(this))
      return this
    },
    append: function (html) {
      this.insertHTML(html, 'append')
    },
    prepend: function (html){
      this.insertHTML(html, 'prepend')
    }
  }

  function checkDOMType (dom, type) {
    return Object.prototype.toString.call(dom) === '[object ' + type + ']'
  }

  function contains (obj, item) {
    // @type obj: Array, String

    if (typeof obj === 'string') {
      return obj.indexOf(item) > -1
    }

    for(var i in obj) {
      if (obj[i] === item) {
        return true
      }
    }
    return false
  }

  if (typeof W !== 'undefined') {
    for (var shit in jShit) {
      if (!W[shit]) {
        W[shit] = jShit[shit]
      }
    }
  } else if (typeof module !== 'undefined') {
    module.exports = jShit
  }

})(window, document);
