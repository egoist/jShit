(function (W, D) {
  var jShit = {}
  jShit.$ = D.querySelector.bind(D)
  jShit.$$ = D.querySelectorAll.bind(D)
  jShit.dom = function (el) {
    return new DOM(el)
  }

  function DOM (el) {
    if (!el) {
      console.error('cannot find element', el)
      return
    }
    this.el = el
  }

  DOM.prototype = {
    constructor: DOM,
    each: function (fn) {
      if (checkDOMType(this.el, 'NodeList')) {
        Array.prototype.forEach.call(this.el, fn)
      } else {
        fn(this.el)
      }
      return this
    },
    find: function (selector) {
      this.el = this.el.querySelectorAll(selector)
      return this
    },
    attr: function (key, value) {
      if (key && value || key && Boolean(value) === value) {
        this.el.setAttribute(key, value)
        return this
      } else {
        var attr = this.el.getAttribute(key)

        if (attr === 'true') {
          return true
        } else if (attr === 'false') {
          return false
        }

        return attr
      }
    },
    addClass: function (classList) {
      this.el.className = this.el.className ? this.el.className + ' ' + classList : classList
      return this
    },
    removeClass: function (classList) {
      if (!this.el.className) {
        return this
      }
      classList = classList.split(' ')
      classList.forEach(function (className) {
        if (this.el.classList.contains(className)) {
          this.el.classList.remove(className)
        }
      }.bind(this))
      return this
    },
    toggleClass: function (classList) {
      classList = classList.split(' ')
      classList.forEach(function (className) {
        if (this.el.classList.contains(className)) {
          this.el.classList.remove(className)
        } else {
          this.el.classList.add(className)
        }
      }.bind(this))
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
