Byte = mojs.Byte
Bit  = mojs.Bit
ns   = 'http://www.w3.org/2000/svg'
svg  = document.createElementNS?(ns, "svg")
# circle  = new Circle ctx: svg

describe 'Byte ->', ->
  describe 'extension ->', ->
    it 'should extend Bit class', ->
      byte = new Byte ctx: svg
      expect(byte instanceof Bit).toBe(true)



  
  # it 'should have vars function', ->
  #   byte = new Byte
  #   expect(byte.vars).toBeDefined()
  #   expect(-> byte.vars()).not.toThrow()


  # describe 'defaults object ->', ->
    
  #   it 'should have defaults object', ->
  #     byte = new Byte
  #     expect(byte.defaults).toBeDefined()


  # describe 'options object ->', ->
    
  #   it 'should recieve empty options object by default', ->
  #     byte = new Byte
  #     expect(byte.o).toBeDefined()

  #   it 'should recieve options object', ->
  #     byte = new Byte option: 1
  #     expect(byte.o.option).toBe 1



  # # describe 'properies object ->', ->
  # #   it 'should set properties object by extending defaults by options', ->

  # #     byte = new Byte radius: 100
  # #     expect(byte.props.radius).toBe 100


