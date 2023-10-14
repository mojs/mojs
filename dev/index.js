// cSpell: ignore mojs inplace
import mojs from 'src/mojs.babel.js';
import MojsPlayer from '@mojs/player';

// TODO: marbleOptions => Switch between "circle" & "rectangle"

const ORANGE  = "#f59d56";
const GREEN   = "#aded94";
const MAGENTA = "#bd81fb";
const RED     = "#ee695a"

const downArrow = "&#8681;";
const upArrow   = "&#8679;";

const xDiff              = 536 - 22;
const leftBracketX       = 22;
const leftBracket2X      = 536;
const leftBracketY       = 84;
const leftMarbleX        = 64;
const marbleRadius       = 16;
const marbleWidth        = 38;
const bracketWidth       = 12;
const bracketPadding     = 14;
const bracketRightMargin = 22;
const rightArrowX        = 460;
const rightArrowY        = 76;

const IN_PLACE = "IN_PLACE";
const IMMUTABLE = "IMMUTABLE";
const methods = {
  push: { type: IN_PLACE },
  pop: { type: IN_PLACE },
  shift: { type: IN_PLACE },
  unshift: { type: IN_PLACE },
  slice: { type: IMMUTABLE },
  map: { type: IMMUTABLE },
  filter: { type: IMMUTABLE },
  flat: { type: IMMUTABLE },
  slice: { type: IMMUTABLE },
  concat: { type: IMMUTABLE },
  join: { type: IMMUTABLE }
}

function getPosFromProps(props) {
  return parseInt(props.x.split("px")[0]);
}

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function initializeMethod({
  el,
  jsCode,
  methodSyntax,
  methodName,
  creatorFunction,
  active = false,
  indexed = true
}) {

  const methodId = uuid();
  const hashString = '#data=' + encodeURIComponent(
    JSON.stringify({
      code: jsCode
        .split("\n")
        .map(line => {
          return line.trimStart();
        })
        .join("\n")
    })
  );

  const html = `
    <main>
      <div class="demo-init-wrapper">
        <button class="demo-init">&#9658; Play</button>
        <button class="demo-reset">Reset</button>
        <a class="mdn-docs" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/${methodName}" target="_blank">Docs<a/>
      </div>
      <div class="code-show" id="code-show-${methodId}">
        <button class="code-show-btn">
          <span class="arrow">${active ? upArrow : downArrow}</span>
          <span class="text">${active ? "Hide Code" : "Show Code"}</span>
        </button>
        <button class="js-playground-btn">
          <span class="js-arrow">${downArrow}</span>
          <span class="text">Practice</span>
        </button>
      </div>
      </main>
      <pre class="code ${active ? "active" : ""}"></pre>
      <iframe
        class="js-playground"
        width="800"
        height="300"
        loading="lazy"
        frameborder="0"
        src="//unpkg.com/javascript-playgrounds@^1.0.0/public/index.html${hashString}"
      ></iframe>
  `

  if (!methodName) {
    throw new Error("ERROR: methodName not provided.")
  }

  const isImmutable = methods[methodName].type === IMMUTABLE;
  const className = "demo-container " + (isImmutable ? "immutable" : "inplace");
  el.setAttribute("class", className);
  el.style.position = "relative";
  el.insertAdjacentHTML(
    "afterbegin",
    html
  );

  const parent = el.querySelector("main");

  const marbleOptions = {
    parent,
    shape: "circle",
    className: indexed ? "mojs-marble indexed" : "mojs-marble",
    radius: marbleRadius,
    isShowStart: true,
    left: leftMarbleX,
    top: 100,
    y: 0
  }

  const rightArrowHTML = `<div class="char" id="long-right-arrow${methodId}">&xrarr;</div>`

  parent.insertAdjacentHTML("afterbegin", rightArrowHTML)

  parent.insertAdjacentHTML(
    "afterbegin",
    `<div class="char method" id="${methodName}">
      ${methodSyntax}
    </div>
    `
  );

  el.querySelector("pre").insertAdjacentHTML(
    "beforeend",
    `<code class="language-javascript">${jsCode}</code>`
  );

  el.querySelector(`#code-show-${methodId} .code-show-btn`).addEventListener("click", () => {

    const preEl = el.querySelector("pre.code");
    const arrow = el.querySelector("span.arrow");
    const arrowText = el.querySelector("button span.text");
    if (preEl.classList.contains("active")) {
      arrow.innerHTML = downArrow;
      arrowText.textContent = "Show Code";
      return preEl.classList.remove("active");
    }
    arrowText.textContent = "Hide Code";
    arrow.innerHTML = upArrow;
    return preEl.classList.add("active");
  });

  el.querySelector(`#code-show-${methodId} .js-playground-btn`).addEventListener("click", () => {

    const preEl = el.querySelector(".js-playground");
    const arrow = el.querySelector(".js-arrow");
    if (preEl.classList.contains("active")) {
      arrow.innerHTML = downArrow;
      return preEl.classList.remove("active");
    }
    arrow.innerHTML = upArrow;
    return preEl.classList.add("active");
  });

  const rightArrow = new mojs.Html({
    el: `#long-right-arrow${methodId}`,
    scale: 2,
    x: rightArrowX,
    y: rightArrowY,
    duration: 3000,
  })

  function getBracket({ id, dir = "left", x = 0, y = 0, ...args }) {

    const bracketEl = addBracketElToParent({ dir }, parent);

    return new mojs.Html({ el: bracketEl, x, y, ...args })

  }

  function addBracketElToParent({ id, dir = "left" }) {

    const bracketEl = document.createElement("div");
    bracketEl.setAttribute("class", "char");
    if (id) {
      bracketEl.setAttribute("id", id);
    }
    bracketEl.textContent = dir === "left" ? "[" : "]";
    parent.appendChild(bracketEl);
    return bracketEl;

  }

  function getQuote({ id, dir = "left", x = 0, y = 0, ...args }) {

    const bracketEl = addQuoteElToParent({ dir }, parent);

    return new mojs.Html({ el: bracketEl, x, y, ...args })

  }

  function addQuoteElToParent({ id, dir = "left" }) {

    const bracketEl = document.createElement("div");
    bracketEl.setAttribute("class", "char cursive");
    if (id) {
      bracketEl.setAttribute("id", id);
    }
    bracketEl.innerHTML = dir === "left" ? "&ldquo;" : "&rdquo;";
    parent.appendChild(bracketEl);
    return bracketEl;

  }

  function getMarble({ fill = ORANGE, x = 0, y = 0, opacity = 0, index = null, ...args } = {}) {

    return new mojs.Shape({
      ...marbleOptions,
      x,
      opacity: 1,
      fill,
      attrs: typeof index === "number" ? [{ "data-index": index }] : null,
      ...args
    })

  }

  function getMarblesFromInitialX({ count = 0, x = 0, fill, index = false, xOffset = 0, indexOffset = 0, listOfColors = [], bracketed = false, ...args }) {

    if (count === 0) {
      return [];
    }

    const marbles = [];

    for (let i = 0; i < count; i++) {

      const x = (i * marbleWidth) + xOffset + ( bracketed ? 12 : 0 );

      marbles.push(getMarble({
        x,
        fill: listOfColors.length && listOfColors[i] ? listOfColors[i] : fill,
        index: i + indexOffset,
        ...args
      }));

    }

    if ( bracketed ){

      const leftBracket = getBracket({
        x: (marbleWidth) + xOffset - 2,
        y: leftBracketY
      });

      const rightBracket = getBracket({
        x: (marbleWidth * 3 ) + xOffset + bracketWidth - 2,
        y: leftBracketY,
        dir: "right"
      });

    }

    return marbles;

  }

  function getBurst({ delay = 0, left = 0, rotate = 0, top = 0, x = 0, y = 0, radius = 120, fill = GREEN, duration = 2000 }) {

    const burst = new mojs.Burst({
      parent: el,
      className: "mojs-burst",
      shape: 'circle',
      left,
      top: leftBracketY + 17,
      x,
      rotate: { 0: rotate },
      y,
      radius: { 0: radius },
      duration,
      children: {
        delay,
        repeat: 0,
        radius: { 6: 2 },
        shape: 'circle',
        fill,
        strokeWidth: { 1: 0 },
        angle: { 360: 0 },
        duration
      },
      count: 20,
    });

    return burst;

  }

  let hasInitialized = false;

  function init(fn) {
    if (!hasInitialized) {
      hasInitialized = true;
      el
        .querySelector(".demo-init")
        .addEventListener("click", fn, { once: true });
      el
        .querySelector(".demo-reset")
        .addEventListener("click", creatorFunction, { once: true });
    }
  }

  return {
    getQuote,
    getMarble,
    getBurst,
    getMarblesFromInitialX,
    getBracket,
    init
  }

}

//>> EXAMPLE #1: push()
(function array_push() {

  // MODIFY >>
  const methodName = "push";
  const code = `
      const letters = [ "A", "B", "C" ];
      letters.push( "D" );

      console.log( letters ); // [ "A", "B", "C", "D" ];`
  const methodSyntax = `.push(<span class="c-space"></span>)`
  // << MODIFY

  const demoContainer = document.querySelector(`section#array-${methodName}`);
  demoContainer.innerHTML = "";

  const { init, getBracket, getMarble, getMarblesFromInitialX } = initializeMethod({
    creatorFunction: array_push,
    el: demoContainer,
    jsCode: code,
    methodSyntax,
    methodName,
    active: false
  });

  const arrayMethodsVisualizedTimeline = new mojs.Timeline({ repeat: 1 });
  const inputMarbles = getMarblesFromInitialX({ count: 4, index: true });
  const outputMarbles = getMarblesFromInitialX({ count: 4, index: true, xOffset: xDiff });

  // MODIFY:
  const pushBallInitial = getMarble({
    x: 254,
    duration: 1000,
    fill: GREEN
  });

  // MODIFY:
  const pushBall = getMarble({
    x: { 254: 666 },
    duration: 3000,
    opacity: { 0: 1 },
    fill: GREEN,
    onComplete: () => {
      pushBall.getProps().el.setAttribute("data-index", 4);
    }

  });

  const leftBracket = getBracket({
    x: leftBracketX,
    y: leftBracketY
  });

  const rightBracket = getBracket({
    x: leftBracketX + (4 * marbleWidth) + bracketPadding,
    y: leftBracketY,
    duration: 3000,
    dir: "right"
  });

  const leftBracket2 = getBracket({
    x: leftBracket2X,
    y: leftBracketY
  });

  const initialRightBracket2X = leftBracket2X + (4 * marbleWidth) + bracketPadding;

  const rightBracket2 = getBracket({
    dir: "right",
    x: {
      [initialRightBracket2X]:
        initialRightBracket2X + marbleWidth
    },
    y: leftBracketY,
    duration: 3000,
  });

  new mojs.Html({
    el: `#${methodName}`,
    x: leftBracketX + (4 * marbleWidth) + bracketPadding + bracketRightMargin,
    y: leftBracketY,
    duration: 3000,
  })

  arrayMethodsVisualizedTimeline
    .add(inputMarbles, outputMarbles)

  init(() => {
    pushBall.play()
    rightBracket2.play();
    pushBallInitial.play();
  });

}());

//>> EXAMPLE #2: pop()
(function pop() {

  // MODIFY:
  const methodName = "pop";

  // MODIFY:
  const code = `
      const letters = [ "A", "B", "C", "D" ];
      letters.pop();
      console.log( letters ); // [ "A", "B", "C" ];
      letters.pop();
      letters.pop();
      console.log( letters ); // [ "A" ];
    `
  // MODIFY:
  const methodSyntax = `.pop()`
  // MODIFY:
  const demoContainer = document.querySelector(`section#array-${methodName}`);
  demoContainer.innerHTML = "";

  const { init, getBracket, getMarble, getMarblesFromInitialX } = initializeMethod({
    creatorFunction: pop,
    el: demoContainer,
    jsCode: code,
    methodSyntax,
    methodName
  });

  const arrayMethodsVisualizedTimeline = new mojs.Timeline({ repeat: 1 });
  const listOfColors = [ORANGE, MAGENTA, RED, GREEN];
  const inputMarbles = getMarblesFromInitialX({
    count: 4,
    index: true,
    listOfColors
  });
  const outputMarbles = getMarblesFromInitialX({
    count: 4,
    index: true,
    xOffset: xDiff,
    duration: 3000,
    listOfColors
  });

  const leftBracket = getBracket({
    x: leftBracketX,
    y: leftBracketY
  });

  const rightBracket = getBracket({
    x: leftBracketX + (4 * marbleWidth) + bracketPadding,
    y: leftBracketY,
    duration: 3000,
    dir: "right"
  });

  const leftBracket2 = getBracket({
    x: leftBracket2X,
    y: leftBracketY
  });

  const initialRightBracket2X = leftBracket2X + (4 * marbleWidth) + bracketPadding;

  const rightBracket2 = getBracket({
    dir: "right",
    x: {
      [initialRightBracket2X]:
        initialRightBracket2X - marbleWidth
    },
    y: leftBracketY,
    duration: 1500,
  });

  // MODIFY:
  new mojs.Html({
    el: `#${methodName}`,
    x: leftBracketX + (4 * marbleWidth) + bracketPadding + bracketRightMargin,
    y: leftBracketY,
    duration: 3000,
  })

  arrayMethodsVisualizedTimeline
    .add(inputMarbles, outputMarbles);

  // MODIFY:
  init(() => {

    const lastOutputMarble = outputMarbles[outputMarbles.length - 1];
    const lastOutputMarbleX = parseInt(lastOutputMarble.getProps().x.split("px")[0]);

    const burst = new mojs.Burst({
      parent: demoContainer,
      className: "mojs-burst",
      shape: 'circle',
      left: lastOutputMarbleX + 66,
      top: leftBracketY + 17,
      x: 0,
      y: 0,
      radius: { 0: 120 },
      duration: 2000,
      children: {
        repeat: 0,
        radius: { 6: 2 },
        shape: 'circle',
        fill: GREEN,
        strokeWidth: { 1: 0 },
        angle: { 360: 0 },
        duration: 1000
      },
      count: 20,
    });

    lastOutputMarble.tune({
      duration: 1000,
      opacity: { 1: 0 }
    });

    lastOutputMarble.play();
    burst.play();
    rightBracket2.play();

  });




}());

//>> EXAMPLE #3: shift()
(function array_shift() {

  // MODIFY:
  const methodName = "shift";

  // MODIFY:
  const code = `
      const letters = [ "Z", "A", "B", "C" ];
      letters.shift();
      console.log( letters ); // [ "A", "B", "C" ];
      letters.shift();
      letters.shift();
      console.log( letters ); // [ "C" ];
    `
  // MODIFY:
  const methodSyntax = `.shift()`
  // MODIFY:
  const demoContainer = document.querySelector(`section#array-${methodName}`);
  demoContainer.innerHTML = "";

  const { init, getBracket, getMarble, getMarblesFromInitialX } = initializeMethod({
    creatorFunction: array_shift,
    el: demoContainer,
    jsCode: code,
    methodSyntax,
    methodName
  });

  const arrayMethodsVisualizedTimeline = new mojs.Timeline({ repeat: 1 });
  const listOfColors = [ORANGE, MAGENTA, RED, GREEN];
  const inputMarbles = getMarblesFromInitialX({
    count: 4,
    index: true,
    listOfColors
  });
  const outputMarbles = getMarblesFromInitialX({
    count: 4,
    index: true,
    xOffset: xDiff,
    duration: 3000,
    listOfColors
  });

  const leftBracket = getBracket({
    x: leftBracketX,
    y: leftBracketY
  });

  const rightBracket = getBracket({
    x: leftBracketX + (4 * marbleWidth) + bracketPadding,
    y: leftBracketY,
    duration: 3000,
    dir: "right"
  });

  const leftBracket2 = getBracket({
    x: leftBracket2X,
    y: leftBracketY
  });

  const initialRightBracket2X = leftBracket2X + (4 * marbleWidth) + bracketPadding;

  const rightBracket2 = getBracket({
    dir: "right",
    x: {
      [initialRightBracket2X]:
        initialRightBracket2X - marbleWidth
    },
    y: leftBracketY,
    duration: 1500,
  });

  // MODIFY:
  new mojs.Html({
    el: `#${methodName}`,
    x: leftBracketX + (4 * marbleWidth) + bracketPadding + bracketRightMargin,
    y: leftBracketY,
    duration: 3000,
  })

  arrayMethodsVisualizedTimeline
    .add(inputMarbles, outputMarbles);

  // MODIFY:
  init(() => {

    const firstOutputMarble = outputMarbles[0];
    const firstOutputMarbleX = parseInt(firstOutputMarble.getProps().x.split("px")[0]);

    outputMarbles.slice(1).forEach((marble, idx) => {

      marble.tune((props) => {
        const x = parseInt(props.x.split("px")[0]);
        return {
          x: { [x]: x - marbleWidth },
          duration: 1500,
          onComplete: () => {
            props.el.setAttribute("data-index", idx);
          }
        }
      }).play();

    });

    const burst = new mojs.Burst({
      parent: demoContainer,
      className: "mojs-burst",
      shape: 'circle',
      left: firstOutputMarbleX + 66,
      top: leftBracketY + 17,
      x: 0,
      y: 0,
      radius: { 0: 120 },
      duration: 2000,
      children: {
        repeat: 0,
        radius: { 6: 2 },
        shape: 'circle',
        fill: ORANGE,
        strokeWidth: { 1: 0 },
        angle: { 360: 0 },
        duration: 1000
      },
      count: 20,
    });

    firstOutputMarble.tune({
      duration: 1000,
      opacity: { 1: 0 }
    });

    firstOutputMarble.play();
    burst.play();
    rightBracket2.play();

  });


}());

//>> EXAMPLE #4: unshift()
(function unshift() {

  // MODIFY >>
  const methodName = "unshift";
  const code = `
      const letters = [ "B", "C", "D" ];
      letters.unshift( "A" );

      console.log( letters ); // [ "A", "B", "C", "D" ];
    `
  const methodSyntax = `.unshift(<span class="c-space"></span>)`
  // << MODIFY

  const demoContainer = document.querySelector(`section#array-${methodName}`);
  demoContainer.innerHTML = "";

  const { init, getBracket, getMarble, getMarblesFromInitialX } = initializeMethod({
    creatorFunction: unshift,
    el: demoContainer,
    jsCode: code,
    methodSyntax,
    methodName,
    indexed: false
  });

  const arrayMethodsVisualizedTimeline = new mojs.Timeline({ repeat: 1 });
  const inputMarbles = getMarblesFromInitialX({ count: 4, index: true });
  const outputMarbles = getMarblesFromInitialX({
    count: 4,
    index: true,
    xOffset: xDiff,
    duration: 3000
  });

  // MODIFY:
  const initialX = 283;
  const pushBallInitial = getMarble({
    x: initialX,
    duration: 1000,
    fill: GREEN
  });

  // MODIFY:
  const pushBall = getMarble({
    x: { [initialX]: xDiff },
    duration: 3000,
    opacity: { 0: 1 },
    fill: GREEN,
    onComplete: () => {
      pushBall.getProps().el.setAttribute("data-index", 0);
    }

  })

  const leftBracket = getBracket({
    x: leftBracketX,
    y: leftBracketY
  });

  const rightBracket = getBracket({
    x: leftBracketX + (4 * marbleWidth) + bracketPadding,
    y: leftBracketY,
    duration: 3000,
    dir: "right"
  });

  const leftBracket2 = getBracket({
    x: leftBracket2X,
    y: leftBracketY
  });

  const initialRightBracket2X = leftBracket2X + (4 * marbleWidth) + bracketPadding;

  const rightBracket2 = getBracket({
    dir: "right",
    x: {
      [initialRightBracket2X]:
        initialRightBracket2X + marbleWidth
    },
    y: leftBracketY,
    duration: 3000,
  });

  new mojs.Html({
    el: `#${methodName}`,
    x: leftBracketX + (4 * marbleWidth) + bracketPadding + bracketRightMargin,
    y: leftBracketY,
    duration: 3000,
  })

  arrayMethodsVisualizedTimeline
    .add(inputMarbles, outputMarbles)

  // MODIFY:
  init(() => {
    pushBall.play()
    rightBracket2.play();
    pushBallInitial.play();

    outputMarbles.forEach((c, i) => {

      const x = parseInt(c.getProps().x.split("px")[0])

      c.tune({
        x: { [x]: x + marbleWidth },
        onComplete: () => {
          c.getProps().el.setAttribute("data-index", i + 1);
        }
      });
      c.play();

    })


  });



}());

//>> EXAMPLE #5: filter()
(function array_filter() {

  // MODIFY >>
  const methodName = "filter";
  const code = `
      const years = [ 2021, 1999, 2004, 2023, 2001 ];
      const lateYears = years.filter( value => value > 2020 );

      console.log( lateYears ); // [ 2021, 2023 ];`
  const methodSyntax = `.filter(<span class="c-space"></span>)`
  // << MODIFY

  const demoContainer = document.querySelector(`section#array-${methodName}`);
  demoContainer.innerHTML = "";
  const fadeOutOpacityLevel = 0.3;

  const { init, getBracket, getMarble, getMarblesFromInitialX, getBurst } = initializeMethod({
    creatorFunction: array_filter,
    el: demoContainer,
    jsCode: code,
    methodSyntax,
    methodName,
    active: false
  });

  // MODIFY:
  const pushBallInitialX = 248;
  const pushBallInitial = getMarble({
    x: pushBallInitialX,
    duration: 1000,
    fill: GREEN
  });

  const inputMarbles = getMarblesFromInitialX({
    count: 4,
    index: true,
    listOfColors: [ORANGE, GREEN, GREEN, ORANGE]
  });
  const movingMarbles = getMarblesFromInitialX({
    count: 4,
    index: true,
    listOfColors: [ORANGE, GREEN, GREEN, ORANGE]
  });

  const leftBracket = getBracket({
    x: leftBracketX,
    y: leftBracketY
  });

  const rightBracket = getBracket({
    x: leftBracketX + (4 * marbleWidth) + bracketPadding,
    y: leftBracketY,
    duration: 3000,
    dir: "right"
  });

  const leftBracket2 = getBracket({
    x: leftBracket2X,
    y: leftBracketY
  });

  const initialRightBracket2X = leftBracket2X + (2 * marbleWidth) + bracketPadding - (marbleWidth * 2);

  const rightBracket2 = getBracket({
    dir: "right",
    x: initialRightBracket2X,
    y: leftBracketY,
  });

  new mojs.Html({
    el: `#${methodName}`,
    x: leftBracketX + (4 * marbleWidth) + bracketPadding + bracketRightMargin,
    y: leftBracketY,
    duration: 3000,
  })

  // console.log(outputMarbles[0].getProps().x); // 514px
  // console.log(outputMarbles[1].getProps().x); // 552px

  init(() => {

    const burst = getBurst({ left: 314, fill: ORANGE }); // <= 314 <= Imprecise?
    const { x } = movingMarbles[3].getProps();
    const durationSpeed = 1000;

    const fourthMarble = movingMarbles[3].tune(props => {
      const x = getPosFromProps(props);
      return {
        onComplete: () => {
          burst.tune({
            onComplete: function afterBurst() { }
          }).play();
        },
        duration: durationSpeed,
        x: { [x]: pushBallInitialX }
      }
    })
      .then({
        delay: 150,
        opacity: { 1: 0 }
      });

    const thirdMarble = movingMarbles[2]
      .tune(props => {
        const x = getPosFromProps(props);

        return {
          onComplete: function afterThirdMarblePassesCallback() {
            movingMarbles[2].getProps().el.setAttribute("data-index", 1);
          },
          duration: durationSpeed,
          x: { [x]: pushBallInitialX }
        }
      })
      .then({
        duration: durationSpeed + 500,
        x: { [pushBallInitialX]: 552 },
        onComplete: function afterThirdMarble() {
          inputMarbles[3].tune({
            opacity: { [1]: fadeOutOpacityLevel }
          }).play();
          fourthMarble.play();
        }
      });

    const secondMarble = movingMarbles[1]
      .tune(props => {
        const x = getPosFromProps(props);

        return {
          onComplete: function () {
            movingMarbles[1].getProps().el.setAttribute("data-index", 0);
          },
          duration: durationSpeed,
          x: { [x]: pushBallInitialX }
        }
      })
      .then({
        duration: durationSpeed + 500,
        x: { [pushBallInitialX]: 514 },
        onComplete: function afterSecondMarble() {
          inputMarbles[2].tune({
            opacity: { [1]: fadeOutOpacityLevel }
          }).play();
          thirdMarble.play();
        }
      });

    const firstMarble = movingMarbles[0].tune(props => {
      const x = getPosFromProps(props);

      inputMarbles[0].tune({
        opacity: { [1]: fadeOutOpacityLevel }
      }).play();

      return {
        onComplete: () => {
          burst.tune({
            onComplete: function afterBurst() {

              rightBracket2
                .then({
                  delay: 900,
                  duration: durationSpeed,
                  x: { [initialRightBracket2X]: initialRightBracket2X + marbleWidth }
                })
                .then({
                  delay: 1800,
                  duration: durationSpeed,
                  x: { [initialRightBracket2X + marbleWidth]: initialRightBracket2X + (marbleWidth * 2) }
                })
                .play();

              inputMarbles[1].tune({
                opacity: { [1]: fadeOutOpacityLevel }
              }).play();

              secondMarble.play();

            }
          }).play();
        },
        duration: durationSpeed,
        x: { [x]: pushBallInitialX }
      }
    })
      .then({
        delay: 150,
        opacity: { 1: 0 }
      });

    firstMarble.play();

  });


}());

//>> EXAMPLE #6: map()
(function array_map() {

  // MODIFY >>
  const methodName = "map";
  const code = `
      const strings = [ "abc", "def", "ghi" ];
      const uppercaseStrings = strings.map( str => str.toUpperCase() );

      console.log( uppercaseStrings ); // [ "ABC", "DEF", "GHI" ];`
  const methodSyntax = `.map(<span class="c-space"></span>)`
  // << MODIFY

  const demoContainer = document.querySelector(`section#array-${methodName}`);
  demoContainer.innerHTML = "";
  const fadeOutOpacityLevel = 0.3;

  const { init, getBracket, getMarble, getMarblesFromInitialX, getBurst } = initializeMethod({
    creatorFunction: array_map,
    el: demoContainer,
    jsCode: code,
    methodSyntax,
    methodName,
    active: false
  });

  // MODIFY:
  const pushBallInitialX = 245;
  const pushBallInitial = getMarble({
    x: pushBallInitialX,
    duration: 1000,
    fill: GREEN
  });

  const inputMarbles = getMarblesFromInitialX({
    count: 4,
    index: true,
    listOfColors: [ORANGE, ORANGE, ORANGE, ORANGE]
  });
  const movingMarbles = getMarblesFromInitialX({
    count: 4,
    index: true,
    listOfColors: [ORANGE, ORANGE, ORANGE, ORANGE]
  });

  const leftBracket = getBracket({
    x: leftBracketX,
    y: leftBracketY
  });

  const rightBracket = getBracket({
    x: leftBracketX + (4 * marbleWidth) + bracketPadding,
    y: leftBracketY,
    duration: 3000,
    dir: "right"
  });

  const leftBracket2 = getBracket({
    x: leftBracket2X,
    y: leftBracketY
  });

  const initialRightBracket2X = leftBracket2X + (2 * marbleWidth) + bracketPadding - (marbleWidth * 2);

  const rightBracket2 = getBracket({
    dir: "right",
    x: initialRightBracket2X,
    y: leftBracketY,
  });

  new mojs.Html({
    el: `#${methodName}`,
    x: leftBracketX + (4 * marbleWidth) + bracketPadding + bracketRightMargin,
    y: leftBracketY,
    duration: 3000,
  })

  init(() => {

    const burst = getBurst({ left: 314, fill: GREEN, radius: 60, duration: 1000, rotate: 180 }); // <= 314 <= Imprecise?
    const { x } = movingMarbles[3].getProps();
    const durationSpeed = 1000;

    const fourthMarble = movingMarbles[3]
      .tune(props => {
        const x = getPosFromProps(props);
        return {
          onComplete: function afterThirdMarblePassesCallback() {
            burst.tune({
              onComplete: function afterBurst() {
              }
            }).play();
          },
          duration: durationSpeed,
          x: { [x]: pushBallInitialX }
        }
      })
      .then({
        fill: GREEN,
        duration: durationSpeed + 500,
        x: { [pushBallInitialX]: 514 + (marbleWidth * 3) },
        onComplete: function afterThirdMarble() {
        }
      });

    const thirdMarble = movingMarbles[2]
      .tune(props => {
        const x = getPosFromProps(props);
        return {
          onComplete: function afterThirdMarblePassesCallback() {
            burst.tune({
              onComplete: function afterBurst() {
              }
            }).play();
          },
          duration: durationSpeed,
          x: { [x]: pushBallInitialX }
        }
      })
      .then({
        fill: GREEN,
        duration: durationSpeed + 500,
        x: { [pushBallInitialX]: 514 + (marbleWidth * 2) },
        onComplete: function afterThirdMarble() {
          inputMarbles[3].tune({
            opacity: { [1]: fadeOutOpacityLevel }
          }).play();
          fourthMarble.play();
        }
      });

    const secondMarble = movingMarbles[1]
      .tune(props => {
        const x = getPosFromProps(props);

        return {
          onComplete: function () {
            burst.tune({
              onComplete: function afterBurst() {
              }
            }).play();
          },
          duration: durationSpeed,
          x: { [x]: pushBallInitialX }
        }
      })
      .then({
        fill: GREEN,
        duration: durationSpeed + 500,
        x: { [pushBallInitialX]: 514 + marbleWidth },
        onComplete: function afterSecondMarble() {
          inputMarbles[2].tune({
            opacity: { [1]: fadeOutOpacityLevel }
          }).play();
          thirdMarble.play();
        }
      });

    const firstMarble = movingMarbles[0]
      .tune(props => {
        const x = getPosFromProps(props);

        inputMarbles[0].tune({
          opacity: { [1]: fadeOutOpacityLevel }
        }).play();

        return {
          onComplete: () => {
            rightBracket2
              .then({
                delay: 0,
                duration: durationSpeed,
                x: { [initialRightBracket2X]: initialRightBracket2X + marbleWidth }
              })
              .then({
                delay: 900,
                duration: durationSpeed,
                x: { [initialRightBracket2X + marbleWidth]: initialRightBracket2X + (marbleWidth * 2) }
              })
              .then({
                delay: 1700,
                duration: durationSpeed,
                x: { [initialRightBracket2X + (marbleWidth * 2)]: initialRightBracket2X + (marbleWidth * 3) }
              })
              .then({
                delay: 1500,
                duration: durationSpeed,
                x: { [initialRightBracket2X + (marbleWidth * 3)]: initialRightBracket2X + (marbleWidth * 4) }
              })
              .play();

            burst.tune({
              onComplete: function afterBurst() {
                inputMarbles[1].tune({
                  opacity: { [1]: fadeOutOpacityLevel }
                }).play();

                secondMarble.play();
              }
            }).play();

          },
          duration: durationSpeed,
          x: { [x]: pushBallInitialX }
        }
      }).then({
        fill: GREEN,
        duration: durationSpeed,
        x: { [pushBallInitialX]: 514 }
      })

    firstMarble.play();

  });


}());

//>> EXAMPLE #7: join("-")
(function array_join() {

  // MODIFY >>
  const methodName = "join";
  const code = `
      const letters = [ "J", "a", "v", "a", "S", "c", "r", "i", "p", "t" ];
      const bestLanguage = letters.join("");

      console.log( bestLanguage ); // "JavaScript"`
  const methodSyntax = `.join("<span class="inline-block" id="join-hyphen">-</span>")`
  // << MODIFY

  const demoContainer = document.querySelector(`section#array-${methodName}`);
  demoContainer.innerHTML = "";
  const fadeOutOpacityLevel = 0.3;

  const { init, getBracket, getMarble, getMarblesFromInitialX, getQuote } = initializeMethod({
    creatorFunction: array_join,
    el: demoContainer,
    jsCode: code,
    methodSyntax,
    methodName,
    active: false
  });

  // MODIFY:

  const inputMarbles = getMarblesFromInitialX({
    count: 4,
    index: true,
    listOfColors: [ORANGE, MAGENTA, RED, GREEN]
  });
  const movingMarbles = getMarblesFromInitialX({
    count: 4,
    index: true,
    listOfColors: [ORANGE, MAGENTA, RED, GREEN]
  });

  const leftBracket = getBracket({
    x: leftBracketX,
    y: leftBracketY
  });

  const rightBracket = getBracket({
    x: leftBracketX + (4 * marbleWidth) + bracketPadding,
    y: leftBracketY,
    duration: 3000,
    dir: "right"
  });

  const leftBracket2 = getQuote({
    x: leftBracket2X,
    y: leftBracketY
  });

  const initialRightBracket2X = leftBracket2X + (2 * marbleWidth) + bracketPadding - 64;

  const durationSpeed = 1000;

  const rightQuote = getQuote({
    dir: "right",
    x: initialRightBracket2X,
    y: leftBracketY,
  }).then({
    delay: 0,
    duration: durationSpeed,
    x: { [initialRightBracket2X]: initialRightBracket2X - 8 + marbleWidth }
  }).then({
    delay: 0,
    duration: durationSpeed,
    x: { [initialRightBracket2X - 8 + marbleWidth]: initialRightBracket2X + (marbleWidth * 2) }
  }).then({
    delay: 0,
    duration: durationSpeed,
    x: { [initialRightBracket2X + (marbleWidth * 2)]: initialRightBracket2X + (marbleWidth * 3) + 8 }
  }).then({
    delay: 0,
    duration: durationSpeed,
    x: { [initialRightBracket2X + (marbleWidth * 3) + 8]: initialRightBracket2X + (marbleWidth * 4) + 16 }
  });

  new mojs.Html({
    el: `#${methodName}`,
    x: leftBracketX + (4 * marbleWidth) + bracketPadding + bracketRightMargin,
    y: leftBracketY,
    duration: 3000,
  })

  const joinHyphen = document.querySelector(`#join-hyphen`);

  const clone = joinHyphen.cloneNode(true);

  for (let i = 1; i < 4; i++) {
    const _clone = clone.cloneNode(true);
    _clone.removeAttribute("id");
    _clone.setAttribute("id", "join-hyphen-" + i);
    _clone.setAttribute("class", "join-hyphens");
    joinHyphen.appendChild(_clone);
  }

  const firstHyphen = new mojs.Html({
    el: document.querySelector(`#join-hyphen-1`),
    x: 0,
    y: 0,
    duration: 1000
  });

  const secondHyphen = new mojs.Html({
    el: document.querySelector(`#join-hyphen-2`),
    x: 0,
    y: 0,
    duration: 1000
  });

  const thirdHyphen = new mojs.Html({
    el: document.querySelector(`#join-hyphen-3`),
    x: 0,
    y: 0,
    duration: 1000
  });

  init(() => {

    const { x } = movingMarbles[3].getProps();

    function onFourthMarbleComplete() {

    }

    function onThirdMarbleComplete() {
      const fourthMarble = movingMarbles[3]
        .tune(props => {
          const x = getPosFromProps(props);

          return {
            onComplete: onFourthMarbleComplete,
            duration: durationSpeed,
            x: { [x]: initialRightBracket2X + (marbleWidth * 2) + 16 }
          }
        }).play();
    }

    function onSecondMarbleComplete() {
      const thirdMarble = movingMarbles[2]
        .tune(props => {
          const x = getPosFromProps(props);

          return {
            onComplete: onThirdMarbleComplete,
            duration: durationSpeed,
            x: { [x]: initialRightBracket2X + marbleWidth + 8 }
          }
        }).play();
    }

    function onFirstMarbleComplete() {

      const secondMarble = movingMarbles[1]
        .tune(props => {
          const x = getPosFromProps(props);

          return {
            onComplete: onSecondMarbleComplete,
            duration: durationSpeed,
            x: { [x]: initialRightBracket2X }
          }
        }).play();

    }

    const firstMarble = movingMarbles[0]
      .tune(props => {
        const x = getPosFromProps(props);

        firstHyphen.then({
          duration: 1000,
          x: { [0]: 300 }
        }).play();

        secondHyphen.then({
          delay: 1000,
          duration: 1000,
          x: { [0]: 300 + marbleWidth + 8 }
        }).play();

        thirdHyphen.then({
          delay: 2000,
          duration: 1000,
          x: { [0]: 300 + (marbleWidth * 2) + 16 }
        }).play();

        inputMarbles[0].tune({
          opacity: { [1]: fadeOutOpacityLevel }
        }).play();

        inputMarbles[1].tune({
          delay: 1000,
          opacity: { [1]: fadeOutOpacityLevel }
        }).play();

        inputMarbles[2].tune({
          delay: 2000,
          opacity: { [1]: fadeOutOpacityLevel }
        }).play();

        inputMarbles[3].tune({
          delay: 3000,
          opacity: { [1]: fadeOutOpacityLevel }
        }).play();

        rightQuote.play();

        return {
          onComplete: onFirstMarbleComplete,
          duration: durationSpeed,
          x: { [x]: initialRightBracket2X - 8 - marbleWidth }
        }
      });

    firstMarble.play();

  });


}());

//>> EXAMPLE #8: concat()
(function array_concat() {

}());

//>> EXAMPLE #9: flat()
(function array_flat() {

  // MODIFY >>
  const methodName = "flat";
  const code = `
        const unflatted = [ "A", "B", [ "a", "b" ] ];
        const flat = unflatted.flat();

        console.log( flat ); // [ "A", "B", "a", "b" ];

        const deep = [ 1, 2, [ 3, 4, [ 5, 6 ] ] ];
        const flatDeep = deep.flat(2);

        console.log( flatDeep ); // [ 1, 2, 3, 4, 5, 6 ];
  `
  const methodSyntax = `.flat(<span></span>)`
  // << MODIFY

  const demoContainer = document.querySelector(`section#array-${methodName}`);
  demoContainer.innerHTML = "";
  const fadeOutOpacityLevel = 0.3;

  const { init, getBracket, getMarble, getMarblesFromInitialX, getBurst } = initializeMethod({
    creatorFunction: array_flat,
    el: demoContainer,
    jsCode: code,
    methodSyntax,
    methodName,
    active: false
  });

  // MODIFY:
  const inputMarbles = getMarblesFromInitialX({
    count: 2,
    index: true,
    listOfColors: [ORANGE, MAGENTA]
  });
  const inputMarblesNested = getMarblesFromInitialX({
    count: 2,
    index: true,
    bracketed: true,
    xOffset: ( marbleWidth * 2 ),
    indexOffset: 2,
    listOfColors: [RED, GREEN]
  });
  const movingMarbles = getMarblesFromInitialX({
    count: 2,
    index: true,
    listOfColors: [ORANGE, MAGENTA]
  });
  const movingMarblesNested = getMarblesFromInitialX({
    count: 2,
    index: true,
    xOffset: ( marbleWidth * 2 ) + bracketWidth,
    indexOffset: 2,
    listOfColors: [RED, GREEN]
  });

  const leftBracket = getBracket({
    x: leftBracketX,
    y: leftBracketY
  });

  const rightBracket = getBracket({
    x: leftBracketX + (4 * marbleWidth) + bracketPadding + ( bracketWidth * 2 ) + 2,
    y: leftBracketY,
    duration: 3000,
    dir: "right"
  });

  const leftBracket2 = getBracket({
    x: leftBracket2X,
    y: leftBracketY
  });

  const initialRightBracket2X = leftBracket2X + (2 * marbleWidth) + bracketPadding - (marbleWidth * 2);

  const rightBracket2 = getBracket({
    dir: "right",
    x: initialRightBracket2X,
    y: leftBracketY,
  });

  new mojs.Html({
    el: `#${methodName}`,
    x: leftBracketX + (4 * marbleWidth) + bracketPadding + bracketRightMargin + ( bracketWidth * 2 ),
    y: leftBracketY,
    duration: 3000,
  })

  init(() => {

    const { x } = inputMarblesNested[1].getProps();
    const durationSpeed = 1000;

    const fourthMarble = movingMarblesNested[1]
      .tune(props => {
        const x = getPosFromProps(props);
        return {
          onComplete: function afterThirdMarblePassesCallback() {
          },
          duration: durationSpeed,
          x: { [x]: 514 + (marbleWidth * 3) }
        }
    });
    const thirdMarble = movingMarblesNested[0]
      .tune(props => {
        const x = getPosFromProps(props);
        return {
          onComplete: function afterThirdMarblePassesCallback() {
            inputMarblesNested[1].tune({
              opacity: { [1]: fadeOutOpacityLevel }
            }).play();
            fourthMarble.play();
          },
          duration: durationSpeed,
          x: { [x]: 514 + (marbleWidth * 2) }
        }
      });

    const secondMarble = movingMarbles[1]
      .tune(props => {
        const x = getPosFromProps(props);

        return {
          onComplete: function () {
            inputMarblesNested[0].tune({
              opacity: { [1]: fadeOutOpacityLevel }
            }).play();

            thirdMarble.play();
          },
          duration: durationSpeed,
          x: { [x]: 514 + marbleWidth }
        }
      });

    const firstMarble = movingMarbles[0]
      .tune(props => {
        const x = getPosFromProps(props);

        inputMarbles[0].tune({
          opacity: { [1]: fadeOutOpacityLevel }
        }).play();

        rightBracket2
          .then({
            delay: 0,
            duration: durationSpeed,
            x: { [initialRightBracket2X]: initialRightBracket2X + marbleWidth }
          })
          .then({
            delay: 0,
            duration: durationSpeed,
            x: { [initialRightBracket2X + marbleWidth]: initialRightBracket2X + (marbleWidth * 2) }
          })
          .then({
            delay: 0,
            duration: durationSpeed,
            x: { [initialRightBracket2X + (marbleWidth * 2)]: initialRightBracket2X + (marbleWidth * 3) }
          })
          .then({
            delay: 0,
            duration: durationSpeed,
            x: { [initialRightBracket2X + (marbleWidth * 3)]: initialRightBracket2X + (marbleWidth * 4) }
          })
          .play();

        return {
          onComplete: () => {
            inputMarbles[1].tune({
              opacity: { [1]: fadeOutOpacityLevel }
            }).play();
            secondMarble.play();
          },
          duration: durationSpeed,
          x: { [x]: 514 }
        }
      });

    firstMarble.play();

  });

}());

//>> EXAMPLE #10: slice(1,3)
(function array_slice() {

    // MODIFY >>
    const methodName = "slice";
    const code = `
          const toBeSliced = [ "A", "B", "C", "D" ];
          const sliced = toBeSliced.slice(1,3);

          console.log( sliced ); // [ "B", "C" ];
    `
    const methodSyntax = `.slice(1,3)`
    // << MODIFY

    const demoContainer = document.querySelector(`section#array-${methodName}`);
    demoContainer.innerHTML = "";
    const fadeOutOpacityLevel = 0.3;

    const { init, getBracket, getMarble, getMarblesFromInitialX, getBurst } = initializeMethod({
      creatorFunction: array_slice,
      el: demoContainer,
      jsCode: code,
      methodSyntax,
      methodName,
      active: false
    });

    // MODIFY:
    const inputMarbles = getMarblesFromInitialX({
      count: 4,
      index: true,
      listOfColors: [ORANGE, MAGENTA, RED, GREEN]
    });
    const movingMarbles = getMarblesFromInitialX({
      count: 4,
      index: true,
      listOfColors: [ORANGE, MAGENTA, RED, GREEN]
    });

    const leftBracket = getBracket({
      x: leftBracketX,
      y: leftBracketY
    });

    const rightBracket = getBracket({
      x: leftBracketX + (4 * marbleWidth) + bracketPadding,
      y: leftBracketY,
      duration: 3000,
      dir: "right"
    });

    const leftBracket2 = getBracket({
      x: leftBracket2X,
      y: leftBracketY
    });

    const initialRightBracket2X = leftBracket2X + (2 * marbleWidth) + bracketPadding - (marbleWidth * 2);

    const rightBracket2 = getBracket({
      dir: "right",
      x: initialRightBracket2X,
      y: leftBracketY,
    });

    new mojs.Html({
      el: `#${methodName}`,
      x: leftBracketX + (4 * marbleWidth) + bracketPadding + bracketRightMargin,
      y: leftBracketY,
      duration: 3000,
    })

    init(() => {

      const { x } = inputMarbles[1].getProps();
      const durationSpeed = 1000;

      const secondMarble = movingMarbles[1]
        .tune(props => {
          const x = getPosFromProps(props);

          inputMarbles[1].tune({
            opacity: { [1]: fadeOutOpacityLevel }
          }).play();

          rightBracket2
          .then({
            delay: 0,
            duration: durationSpeed,
            x: { [initialRightBracket2X]: initialRightBracket2X + (marbleWidth * 2) }
          })
          .play();

          return {
            onComplete: function () {
            },
            duration: durationSpeed * 2,
            x: { [x]: 476 + marbleWidth }
          }
        });

      secondMarble.play();

      const thirdMarble = movingMarbles[2]
        .tune(props => {
          const x = getPosFromProps(props);

          inputMarbles[2].tune({
            opacity: { [1]: fadeOutOpacityLevel }
          }).play();

          return {
            onComplete: function () {
            },
            duration: durationSpeed * 2,
            x: { [x]: 476 + ( marbleWidth * 2 ) }
          }
        });

      thirdMarble.play();

    });

}());

// FILTER METHODS BASED ON TYPE:
const controls            = document.querySelector(".controls");
const playgroundContainer = document.querySelector(".playground-container");
const search              = document.querySelector(".search");
const demoContainers      = document.querySelectorAll(".demo-container");

search.addEventListener("input", e =>{

  demoContainers.forEach( dc =>{
    if (dc.id.indexOf(e.target.value) >  -1 ){
      dc.classList.remove("hidden");
    } else {
      dc.classList.add("hidden");
    }
  })

});

(playgroundContainer && controls) && controls.addEventListener("click", e => {

  const type = e.target.id;

  if (type === "inplace") {
    if (playgroundContainer.classList.contains("show-inplace")) {
      e.target.classList.add("inactive");
      playgroundContainer.classList.remove("show-inplace");
    } else {
      e.target.classList.remove("inactive");
      playgroundContainer.classList.add("show-inplace");
    }
  }

  if (type === "immutable") {
    if (playgroundContainer.classList.contains("show-immutable")) {
      e.target.classList.add("inactive");
      playgroundContainer.classList.remove("show-immutable")
    } else {
      e.target.classList.remove("inactive");
      playgroundContainer.classList.add("show-immutable")
    }
  }


})
