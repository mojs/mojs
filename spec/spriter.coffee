h       = mojs.h
Spriter = mojs.Spriter

describe 'Spriter module ->', ->
  it 'should have defaults', ->
    sp = new Spriter el: document.createElement('div')

    expect(sp.defaults.duration)  .toBe 500
    expect(sp.defaults.delay)     .toBe 0
    expect(sp.defaults.easing)    .toBe 'linear.none'
    expect(sp.defaults.repeat)    .toBe 0
    expect(sp.defaults.yoyo)      .toBe false
    
    expect(sp.defaults.onStart)   .toBe null
    expect(sp.defaults.onUpdate)  .toBe null
    expect(sp.defaults.onComplete).toBe null

  describe 'extendDefaults method', ->
    it 'should extend props by options', ->
      div = document.createElement('div'); fun = ->
      sp = new Spriter
        el: div
        onStart: fun
      expect(sp._props.onStart).toBe fun

  describe 'el option // el parsing', ->
    it  'should recieve el option', ->
      div = document.createElement('div')
      sp = new Spriter el: div
      expect(sp.el).toBe div
    it  'should error if el was not passed', ->
      spyOn h, 'error'
      sp = new Spriter
      expect(h.error).toHaveBeenCalled()
    # it  'should parse el to frames', ->
    #   div = document.createElement('div')
    #   div1 = document.createElement('div')
    #   div2 = document.createElement('div')
    #   div.appendChild(div1); div.appendChild div2

    #   sp = new Spriter el: div
    #   expect(frames.length).toBe 2
    #   expect(frames[0]).toBe div1
    #   expect(frames[1]).toBe div2






