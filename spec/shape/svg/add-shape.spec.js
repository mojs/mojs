var addShape = mojs.addShape;
var getSvgShapeNameID = mojs.__helpers__.getSvgShapeNameID;

var addShape = mojs.addShape;

describe('`addShape` ->', function () {
  it('should add SVG root for shapes', function () {
    var root = document.querySelector('#mojs-svg-shapes');

    expect(root.tagName.toLowerCase()).toBe('svg');
    expect(root.style.display).toBe('none');
  });
  
  it('should add shape', function () {
    var shapeName = 'some-shape';
    var shapeID = 'mojs-some-shape-id';
    var shape = '<rect id="' + shapeID + '"/>';

    addShape(shapeName, shape);

    var shapeInDom = document.querySelector('#' + getSvgShapeNameID(shapeName));

    expect(shapeInDom.getAttribute('id')).toBe(getSvgShapeNameID(shapeName));
    
    expect(shapeInDom.firstChild.tagName.toLowerCase()).toBe('g');
    expect(shapeInDom.firstChild.getAttribute('transform')).toBe('translate(-50, -50)');
    
    expect(shapeInDom.firstChild.firstChild.tagName.toLowerCase()).toBe('rect');
    expect(shapeInDom.firstChild.firstChild.getAttribute('id')).toBe(shapeID);
  });
});
