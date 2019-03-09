(($) => {
  
  const $el = $.el([
    '#:body',
    '#app',
    '#leftBtn',
    '#joinedBtn',
    ['loading', '#:[tg-loading]'],
    ['modeBtn', '#:[tg-footer] button'],
  ])

  const $set = {}
  const $get = {}

  Object.assign($get, {
    mode: () => $.store('mode', null, $.const.mode.LIGHT),
  })

  Object.assign($set, {
    mode: (oldMode) => {
      if (oldMode) {
        $el.body.classList.remove(oldMode)
        $el.app.removeAttribute(oldMode)
      }
      const mode = $get.mode()
      $el.body.classList.add(mode)
      $el.app.setAttribute(mode, '')
      return $set
    },
    finish: () => {
      $el.body.setAttribute('tg-loaded', '')
      return $set
    },
    behaviors: () => {
      $set.handlers
        .joinedClick()
        .leftClick()
        .modeClick();
      return $set;
    },
    handlers: {
      joinedClick: () => {
        $el.joinedBtn.addEventListener('click', () => {
          console.log('joinedBtn')
        })
        return $set.handlers;
      },
      leftClick: () => {
        $el.leftBtn.addEventListener('click', () => {
          console.log('leftBtn')
        })
        return $set.handlers;
      },
      modeClick: () => {
        $el.modeBtn.addEventListener('click', () => {
          const oldMode = $get.mode()
          mode = $.store('mode',
            oldMode === $.const.mode.LIGHT
              ? $.const.mode.DARK
              : $.const.mode.LIGHT
          )
          $set.mode(oldMode)
        })
        return $set.handlers;
      },
    },
  })

  // INIT
  $set
    .mode()
    .behaviors()
    .finish()
})(window.$)

