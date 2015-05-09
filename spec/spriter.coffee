h       = mojs.h
Spriter = mojs.Spriter

describe 'Spriter module ->', ->
  it 'should have defaults', ->
    sp = new Spriter el: document.createElement('div')

    expect(sp._defaults.duration)  .toBe 500
    expect(sp._defaults.delay)     .toBe 0
    expect(sp._defaults.easing)    .toBe 'linear.none'
    expect(sp._defaults.repeat)    .toBe 0
    expect(sp._defaults.yoyo)      .toBe false
    
    expect(sp._defaults.onStart)   .toBe null
    expect(sp._defaults.onUpdate)  .toBe null
    expect(sp._defaults.onComplete).toBe null

  describe 'extendDefaults method', ->
    it 'should extend props by options', ->
      div = document.createElement('div'); fun = ->
      sp = new Spriter el: div, onStart: fun
      expect(sp._props.onUpdate).toBe null
      expect(sp._props.onStart) .toBe fun
      expect(sp._props.delay)   .toBe 0
      expect(sp._props.duration).toBe 500
    it 'should extend props by options', ->
      div = document.createElement('div'); fun = ->
      sp = new Spriter el: div, onComplete: fun
      expect(sp._props.onComplete).toBe fun

    it 'should extend props by options', ->
      div = document.createElement('div'); fun = ->
      sp = new Spriter el: div, repeat: 1
      expect(sp._props.repeat).toBe 1
      expect(sp._props.yoyo)  .toBe false

  describe 'el option // el parsing', ->
    it  'should recieve el option', ->
      div = document.createElement('div')
      sp = new Spriter el: div
      expect(sp.el).toBe div
    it  'should error if el was not passed', ->
      spyOn h, 'error'
      sp = new Spriter
      expect(h.error).toHaveBeenCalled()
    it  'should parse el to frames', ->
      div = document.createElement('div')
      div1 = document.createElement('div')
      div2 = document.createElement('div')
      div.appendChild(div1); div.appendChild div2

      sp = new Spriter el: div
      expect(sp._frames.length).toBe 2
      expect(sp._frames[0]).toBe div1
      expect(sp._frames[1]).toBe div2
    it  'should frames should be real array', ->
      div = document.createElement('div')
      div1 = document.createElement('div')
      div2 = document.createElement('div')
      div.appendChild(div1); div.appendChild div2

      sp = new Spriter el: div
      expect(sp._frames instanceof Array).toBe true
    it  'should warn if 2 or less frames', ->
      div = document.createElement('div')
      div1 = document.createElement('div')
      div.appendChild(div1)
      spyOn h, 'warn'
      sp = new Spriter el: div
      expect(h.warn).toHaveBeenCalled()
    it  'should error if 0 frames parsed', ->
      div = document.createElement('div')
      spyOn h, 'error'
      sp = new Spriter el: div
      expect(h.error).toHaveBeenCalled()






