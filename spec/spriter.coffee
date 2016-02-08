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
    
    expect(sp._defaults.isRunLess) .toBe false
    expect(sp._defaults.isShowEnd) .toBe false
    
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
    it 'should hide all frames', ->
      div = document.createElement('div')
      div1 = document.createElement('div'); div2 = document.createElement('div')
      div3 = document.createElement('div'); div4 = document.createElement('div')
      div.appendChild(div1); div.appendChild(div2); div.appendChild(div3)
      div.appendChild(div4)
      sp = new Spriter el: div, isRunLess: true
      expect(sp._frames[0].style.opacity).toBe '0'
      expect(sp._frames[1].style.opacity).toBe '0'
      expect(sp._frames[2].style.opacity).toBe '0'
      expect(sp._frames[3].style.opacity).toBe '0'
    it 'should calculate _frameStep variable', ->
      div = document.createElement('div')
      div1 = document.createElement('div'); div2 = document.createElement('div')
      div3 = document.createElement('div'); div4 = document.createElement('div')
      div.appendChild(div1); div.appendChild(div2); div.appendChild(div3)
      div.appendChild(div4)
      sp = new Spriter el: div, isRunLess: true
      expect(sp._frameStep).toBe .25

  describe 'tween creation ->', ->
    it 'should create timeline and tween', ->
      div = document.createElement('div')
      div1 = document.createElement('div')
      div2 = document.createElement('div')
      div.appendChild(div1); div.appendChild div2
      sp = new Spriter el: div
      expect(sp.timeline instanceof mojs.Timeline).toBe true
      expect(sp._tween    instanceof mojs.Tween)   .toBe true
      expect(sp.timeline._timelines[0]).toBe sp._tween
    it 'should start tween', (dfr)->
      div = document.createElement('div')
      div1 = document.createElement('div')
      div2 = document.createElement('div')
      div.appendChild(div1); div.appendChild div2
      sp = new Spriter el: div
      spyOn sp.timeline, 'play'
      setTimeout ->
        expect(sp.timeline.play).toHaveBeenCalled()
        dfr()
      , 10
    it 'should not start tween if isRunLess passed', (dfr)->
      div = document.createElement('div')
      div1 = document.createElement('div')
      div2 = document.createElement('div')
      div.appendChild(div1); div.appendChild div2
      sp = new Spriter el: div, isRunLess: true
      spyOn sp.timeline, 'play'
      setTimeout ->
        expect(sp.timeline.play).not.toHaveBeenCalled()
        dfr()
      , 10
  describe '_setProgress method', ->
    it 'should show element on progress', ->
      div = document.createElement('div')
      div1 = document.createElement('div'); div2 = document.createElement('div')
      div3 = document.createElement('div'); div4 = document.createElement('div')
      div.appendChild(div1); div.appendChild(div2); div.appendChild(div3)
      div.appendChild(div4)
      sp = new Spriter el: div, isRunLess: true
      sp._setProgress .5
      expect(sp._frames[0].style.opacity).toBe '0'
      expect(sp._frames[1].style.opacity).toBe '0'
      expect(sp._frames[2].style.opacity).toBe '1'
      expect(sp._frames[3].style.opacity).toBe '0'
    it 'should hide previous element on progress', ->
      div = document.createElement('div')
      div1 = document.createElement('div'); div2 = document.createElement('div')
      div3 = document.createElement('div'); div4 = document.createElement('div')
      div.appendChild(div1); div.appendChild(div2); div.appendChild(div3)
      div.appendChild(div4)
      sp = new Spriter el: div, isRunLess: true
      sp._setProgress .25
      sp._setProgress .5
      expect(sp._frames[0].style.opacity).toBe '0'
      expect(sp._frames[1].style.opacity).toBe '0'
      expect(sp._frames[2].style.opacity).toBe '1'
      expect(sp._frames[3].style.opacity).toBe '0'

    it 'should hide all frames at end', ->
      div = document.createElement('div')
      div1 = document.createElement('div'); div2 = document.createElement('div')
      div3 = document.createElement('div'); div4 = document.createElement('div')
      div.appendChild(div1); div.appendChild(div2); div.appendChild(div3)
      div.appendChild(div4)
      sp = new Spriter el: div, isRunLess: true
      sp._setProgress .25
      sp._setProgress .5
      sp._setProgress 1
      expect(sp._frames[0].style.opacity).toBe '0'
      expect(sp._frames[1].style.opacity).toBe '0'
      expect(sp._frames[2].style.opacity).toBe '0'
      expect(sp._frames[3].style.opacity).toBe '0'
    it 'should not hide the last frame at end if isShowEnd passed', ->
      div = document.createElement('div')
      div1 = document.createElement('div'); div2 = document.createElement('div')
      div3 = document.createElement('div'); div4 = document.createElement('div')
      div.appendChild(div1); div.appendChild(div2); div.appendChild(div3)
      div.appendChild(div4)
      sp = new Spriter el: div, isRunLess: true, isShowEnd: true
      sp._setProgress .25
      sp._setProgress .5
      sp._setProgress 1
      expect(sp._frames[3].style.opacity).toBe '1'

  describe 'onUpdate callback ->', ->
    it 'should be called on every sprite update', ->
      div = document.createElement('div')
      div1 = document.createElement('div'); div2 = document.createElement('div')
      div3 = document.createElement('div'); div4 = document.createElement('div')
      div.appendChild(div1); div.appendChild(div2); div.appendChild(div3)
      div.appendChild(div4)
      sp = new Spriter el: div, isRunLess: true, onUpdate:->
      spyOn sp._props, 'onUpdate'
      sp.timeline.setProgress(.45)
      sp.timeline.setProgress(.5)
      expect(sp._props.onUpdate).toHaveBeenCalled()

    it 'should be called with progress on every sprite update', ->
      div = document.createElement('div')
      div1 = document.createElement('div'); div2 = document.createElement('div')
      div3 = document.createElement('div'); div4 = document.createElement('div')
      div.appendChild(div1); div.appendChild(div2); div.appendChild(div3)
      div.appendChild(div4)
      progress = -1
      sp = new Spriter
        el: div, isRunLess: true
        onUpdate: (p)-> progress = p
      sp.timeline.setProgress(.45)
      sp.timeline.setProgress(.5)
      expect(progress.toFixed(1)).toBe '0.5'

  describe 'run method', ->
    it 'should start tween', ->
      div = document.createElement('div')
      div1 = document.createElement('div'); div2 = document.createElement('div')
      div3 = document.createElement('div'); div4 = document.createElement('div')
      div.appendChild(div1); div.appendChild(div2); div.appendChild(div3)
      div.appendChild(div4)
      sp = new Spriter el: div, isRunLess: true
      spyOn sp.timeline, 'play'
      sp.run()
      expect(sp.timeline.play).toHaveBeenCalled()





