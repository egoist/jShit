# jShit

🚧 WIP. The last library for dirty DOM manipulations if you cannot avoid that.

## Install

First:

```bash
npm install jshit --save
```

Then:

```javascript
// using CommonJS and Webpack with babel-loader
import { $, $$, dom } from 'jshit'

// loaded directly from CDN
// $/$$/dom ... will be automatically exposed as global vars.
```

## API

- $(element)
- $$(elements)

  `$/$$` is just a shorthand for `document.querySelector/document.querySelectorAll`
- dom.find(element)

  like `dom('.list').find('li')`
- dom.each(fn)
- dom.attr(key[, value])
- dom.addClass(classList)
- dom.removeClass(classList)
- dom.toggleClass(classList)

## License

MIT.
