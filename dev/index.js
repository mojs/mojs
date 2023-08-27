import mojs from 'src/mojs.babel.js';
import MojsPlayer from '@mojs/player';

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
const bracketPadding     = 14;
const bracketRightMargin = 22;
const rightArrowX        = 460;
const rightArrowY        = 76;

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function initializeMethod({ el, jsCode, method, active = false, indexed = true }){

  const methodId = uuid();

  const html = `
    <main>
      <div class="demo-init-wrapper">
        <button class="demo-init">&#9658; Play</button>
        <button class="demo-reset" hidden>Reset</button>
      </div>
      <div class="code-show" id="code-show-${methodId}">
        <button>
          <span class="arrow">${active ? upArrow : downArrow}</span>
          <span class="text">${active ? "Hide Code" : "Show Code"}</span>
        </button>
      </div>
    </main>
    <pre class="code ${active ? "active" : ""}"></pre>
  `

  el.setAttribute("class", "demo-container");
  el.insertAdjacentHTML(
    "afterbegin",
    html
  );

  const parent = el.querySelector("main");

  const marbleOptions = {
    parent,
    className: indexed ? "mojs-marble indexed" : "mojs-marble",
    radius: marbleRadius,
    isShowStart: true,
    left: leftMarbleX,
    top: 100,
    y: 0
  }

  const rightArrowHTML = `<div class="char" id="long-right-arrow${methodId}">&xrarr;</div>`

  parent.insertAdjacentHTML("afterbegin", rightArrowHTML)

  parent.insertAdjacentHTML("afterbegin", method);

  el.querySelector("pre").insertAdjacentHTML(
    "beforeend",
    `<code class="language-javascript">${jsCode}</code>`
  );

  el.querySelector(`#code-show-${methodId}`).addEventListener("click", ()=>{

    const preEl = el.querySelector("pre.code");
    const arrow = el.querySelector("span.arrow");
    const arrowText = el.querySelector("button span.text");
    if ( preEl.classList.contains("active")){
      arrow.innerHTML = downArrow;
      arrowText.textContent = "Show Code";
      return preEl.classList.remove("active");
    }
    arrowText.textContent = "Hide Code";
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

  function getBracket({ id, dir = "left", x = 0, y = 0, ...args } ){

    const bracketEl = addBracketElToParent({ dir }, parent );

    return new mojs.Html({ el: bracketEl, x, y, ...args })

  }

  function addBracketElToParent({ id, dir = "left" } ){

    const bracketEl = document.createElement("div");
    bracketEl.setAttribute("class", "char");
    if ( id ) {
      bracketEl.setAttribute("id", id);
    }
    bracketEl.textContent = dir === "left" ? "[" : "]";
    parent.appendChild(bracketEl);
    return bracketEl;

  }

  function getMarble({ fill = ORANGE, x = 0, y = 0, opacity = 0, index = null, ...args } = {}){

    return new mojs.Shape({
      ...marbleOptions,
      x,
      opacity: 1,
      fill,
      attrs: typeof index === "number" ? [{ "data-index": index }] : null,
      ...args
    })

  }

  function getMarblesFromInitialX({ count = 0, x = 0, fill, index = false, xOffset = 0, ...args }){

    if ( count === 0 ){
      return [];
    }

    const marbles = [];

    for (let i = 0; i < count; i++) {

      marbles.push(getMarble({
        x: (i * marbleWidth) + xOffset,
        fill,
        index: i,
        ...args
      }));

    }

    return marbles;

  }

  let hasInitialized = false;

  function init(fn){
    if ( !hasInitialized ){
      hasInitialized = true;
      el
      .querySelector(".demo-init")
      .addEventListener("click",  fn, { once: true });
    }
  }

  return {
    getMarble,
    getMarblesFromInitialX,
    getBracket,
    init
  }

}

//>> EXAMPLE #1: push()
array_push: {

  // MODIFY:
  const pushJS = `
    const letters = [ "A", "B", "C" ];
    letters.push( "D" );

    console.log( letters ); // [ "A", "B", "C", "D" ];
  `

  // MODIFY:
  const method = `
  <div class="char method" id="push">.push(<span class="c-space"></span>)</div>
  `
  // MODIFY:
  const demoContainer      = document.querySelector("section#array-push");

  const { init, getBracket, getMarble, getMarblesFromInitialX } = initializeMethod({
    el: demoContainer,
    jsCode: pushJS,
    method,
    active: true
  });

  const arrayMethodsVisualizedTimeline = new mojs.Timeline({ repeat: 1 });
  const circlesInput = getMarblesFromInitialX({ count: 4, index: true });
  const circlesOutput = getMarblesFromInitialX({ count: 4, index: true, xOffset: xDiff });

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
    x: leftBracketX + ( 4 * marbleWidth ) + bracketPadding,
    y: leftBracketY,
    duration: 3000,
    dir: "right"
  });

  const leftBracket2 = getBracket({
    x: leftBracket2X,
    y: leftBracketY
  });

  const initialRightBracket2X = leftBracket2X + ( 4 * marbleWidth ) + bracketPadding;

  const rightBracket2 = getBracket({
    dir: "right",
    x: {
      [initialRightBracket2X]:
      initialRightBracket2X + marbleWidth
    },
    y: leftBracketY,
    duration: 3000,
  });

  // MODIFY:
  const push = new mojs.Html({
    el: "#push",
    x: leftBracketX + ( 4 * marbleWidth ) + bracketPadding + bracketRightMargin,
    y: leftBracketY,
    duration: 3000,
  })

  arrayMethodsVisualizedTimeline
  .add(circlesInput, circlesOutput)

  init(()=>{
    pushBall.play()
    rightBracket2.play();
    pushBallInitial.play();
  });

}

//>> EXAMPLE #2: unshift()
array_unshift : {

  // MODIFY:
  const pushJS = `
    const letters = [ "B", "C", "D" ];
    letters.unshift( "A" );

    console.log( letters ); // [ "A", "B", "C", "D" ];
  `
  // MODIFY:
  const method = `
  <div class="char method" id="unshift">.unshift(<span class="c-space"></span>)</div>
  `
  // MODIFY:
  const demoContainer = document.querySelector("section#array-unshift");

  const { init, getBracket, getMarble, getMarblesFromInitialX } = initializeMethod({
    el: demoContainer,
    jsCode: pushJS,
    method,
    indexed: false
  });

  const arrayMethodsVisualizedTimeline = new mojs.Timeline({ repeat: 1 });
  const circlesInput = getMarblesFromInitialX({ count: 4, index: true });
  const circlesOutput = getMarblesFromInitialX({
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
    x: { [initialX] : xDiff },
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
    x: leftBracketX + ( 4 * marbleWidth ) + bracketPadding,
    y: leftBracketY,
    duration: 3000,
    dir: "right"
  });

  const leftBracket2 = getBracket({
    x: leftBracket2X,
    y: leftBracketY
  });

  const initialRightBracket2X = leftBracket2X + ( 4 * marbleWidth ) + bracketPadding;

  const rightBracket2 = getBracket({
    dir: "right",
    x: {
      [initialRightBracket2X]:
      initialRightBracket2X + marbleWidth
    },
    y: leftBracketY,
    duration: 3000,
  });

  // MODIFY:
  const unshift = new mojs.Html({
    el: "#unshift",
    x: leftBracketX + ( 4 * marbleWidth ) + bracketPadding + bracketRightMargin,
    y: leftBracketY,
    duration: 3000,
  })

  arrayMethodsVisualizedTimeline
  .add(circlesInput, circlesOutput)

  // MODIFY:
  init(()=>{
    pushBall.play()
    rightBracket2.play();
    pushBallInitial.play();

    circlesOutput.forEach((c, i) =>{

      const x = parseInt(c.getProps().x.split("px")[0])

      c.tune({
        x: { [x] : x + marbleWidth },
        onComplete: ()=>{
        c.getProps().el.setAttribute("data-index", i+1);
      }});
      c.play();

    })


  });

}

//>> EXAMPLE #3: pop()

//>> EXAMPLE #4: shift()

//>> EXAMPLE #5: filter()

//>> EXAMPLE #6: map()

//>> EXAMPLE #7: join("-")

//>> EXAMPLE #8: concat()

//>> EXAMPLE #9: flat()

//>> EXAMPLE #10: slice(1,3)
