# main = require '../dist/mojs.js'

describe 'Main', ->
  it 'should run tests', ->
    expect(mojs.var).toBe 'var'
  it 'should have method', ->
    expect(mojs.method).toBeDefined()
  it 'should have tar', ->
    mojs.method2()
    expect(mojs.tar).toBe 'nar'
  it 'should have mar', ->
    mojs.method()
    expect(mojs.gar).toBe 'mar'