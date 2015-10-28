(function (W, D) {
  var jShit = {}
  jShit.$ = D.querySelector.bind(D)
  jShit.$$ = D.querySelectorAll.bind(D)
  jShit.dom = function (el) {
    return new DOM(el)
  }

  function DOM (el) {
    this.name = el
    var attrIndex = el.indexOf('[')
    var attrRe = /\[\S+\]/
    if (attrIndex > 0 && attrRe.test(el)) {
      el = el.substring(0, attrIndex).trim()
      var attrAll = this.name.match(attrRe)[0]
      attrAll = attrAll.substring(1, attrAll.length - 1)
      var attrKey = attrAll.split('=')[0].trim()
      var attrValue = attrAll.split('=')[1].trim()
      var matches = []
      domEach($$(el), function (el) {
        if (attr(el, attrKey) === attrValue) {
          matches.push(el)
        }
      })
      el = matches
    } else {
      el = $$(el)
    }
    if (!el) {
      console.error('cannot find element', el)
      return
    }
    this.el = el
  }

  DOM.prototype = {
    constructor: DOM,
    each: function (fn) {
      domEach(this.el, fn)
      return this
    },
    find: function (selector) {
      this.el = this.el[0].querySelectorAll(selector)
      return this
    },
    attr: function (key, value) {
      if (value) {
        attr(this.el[0], key, value)
        return this
      } else {
        return attr(this.el[0], key, value)
      }
    },
    addClass: function (classList) {
      this.each(function (el) {
        el.className = el.className ? el.className + ' ' + classList : classList

      }.bind(this))
      return this
    },
    removeClass: function (classList) {
      this.each(function (el) {
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
      this.each(function (el) {
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
      this.each(function (el) {
        el.parentNode.removeChild(el)
      }.bind(this))
      return this
    },
    insertHTML: function (html, type) {
      this.each(function (el) {
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

  function attr (el, key, value) {
    if (key && value || key && Boolean(value) === value) {
      el.setAttribute(key, value)
    } else {
      var attrValue = el.getAttribute(key)

      if (attrValue === 'true') {
        return true
      } else if (attrValue === 'false') {
        return false
      }

      return attrValue
    }
  }

  function domEach (els, fn) {
    if (checkDOMType(els, 'NodeList') || checkDOMType(els, 'Array')) {
      Array.prototype.forEach.call(els, fn)
    } else {
      fn(els)
    }
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
