window.$ = (({ localStorage }) => {
  const $ = {}
  const _store = localStorage.tg ? JSON.parse(localStorage.tg): {}
  return Object.assign($, {
    
    el: selectors => selectors.reduce((res, item) => {
      let key = null
      if (Array.isArray(item)) {
        key = item[0]
        item = item[1]
      }
      const method = item.startsWith('#')
        ? 'querySelector'
        : 'querySelectorAll'
      if (!key) {
        key = item
          .replace(/\W/ig, ' ').trim()
          .replace(/\s+\w/g, v => v.trim().toUpperCase())
      }
      item.startsWith('#:') && (item = item.substr(2))
      res[key] = document[method](item)
      return res
    }, {}),
    
    store: (key, value = null, defValue = undefined) => {
      if (value === null) {
        // Getter
        if (key in _store) {
          return _store[key]
        }
        return defValue
      } else {
        // Setter
        _store[key] = value
        localStorage.tg = JSON.stringify(_store)
        return value
      }
    },
  })
})({
  localStorage: window.localStorage,
})
