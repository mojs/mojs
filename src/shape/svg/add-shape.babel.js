const NS = 'http://www.w3.org/2000/svg';

// add root SVG
const root = document.createElementNS(NS, 'svg');
root.setAttribute('style', `display: none`);
root.setAttribute('id', `mojs-svg-shapes`);
document.body.appendChild(root);

/**
 * `template` - function to render SVG shape.
 * 
 * @param {String} shape Shape to add.
 * @returns {String} Rendered shape string.
*/
const template = (shape) => {
  return `<g transform="translate(-50, -50)">${ shape }</g>`;
};

/**
 * `getSvgShapeNameID` - function to create SVG shape `id` regarding its name.
 * 
 * @param {String} name Shape name.
 * @returns {String} Shape ID.
*/
export const getSvgShapeNameID = (name) => {
  return `${name}-mojs-svg-shape`;
};

/**
 * `addShape` - function to add SVG shape to the DOM.
 * 
 * @param {String} name Shape name.
 * @param {String} shape Shape.
*/
export const addShape = (name, shape) => {
  const element = document.createElementNS(NS, 'g');
  element.setAttribute('id', getSvgShapeNameID(name));
  root.appendChild(element);

  element.innerHTML = template(shape);
};
