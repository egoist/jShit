test('Selector is object', function () {
  ok(typeof $('.list') === 'object')
  ok(typeof $$('.list') === 'object')

})

test('dom function', function () {
  var els = dom('.list').find('li')
  ok(typeof els === 'object')
  els.each(function (el) {
    el.innerHTML = 'done'
    ok(el.innerHTML === 'done')
  })
})

test('attr', function () {
  dom('body').attr('what', 'wg')
  ok(dom('body').attr('what') === 'wg')

  dom('.list').attr('hi', false)
  ok(dom('.list').attr('hi') == false)
})

test('classList', function () {
  dom('body').addClass('what is bad')
  ok($('body').className === 'what is bad')

  dom('body').removeClass('what is')
  ok($('body').className === 'bad')

  dom('body').toggleClass('bad')
  ok(!$('body').className)
})

test('remove', function () {
  dom('.list').remove()
  ok(!$('.list'))
})

test('append', function () {
  dom('body').append('<p class="wow">text node</p>')
  ok($('.wow'))
})

test('prepend', function () {
  dom('body').prepend('<p class="wowp">text node</p>')
  ok($('.wowp'))
})

test('get by attr', function () {
  ok(dom('body [hell=yeah]'))
})
