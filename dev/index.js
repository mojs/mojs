import mojs from 'src/mojs.babel.js';
import MojsPlayer from '@mojs/player';

const orange  = "#f59d56";
const green   = "#aded94";
const magenta = "#bd81fb";
const red     = "#ee695a"

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

const marbleOptions = {
  className: "mojs-marble",
  radius: marbleRadius,
  isShowStart: true,
  left: leftMarbleX,
  top: 100,
  y: 0
}

function addBracketElToParent({ id, dir = "left" }, parent ){

  const bracketEl = document.createElement("div");
  bracketEl.setAttribute("class", "char");
  if ( id ) {
    bracketEl.setAttribute("id", id);
  }
  bracketEl.textContent = dir === "left" ? "[" : "]";
  parent.appendChild(bracketEl);
  return bracketEl;

}

function getMarble({ fill = orange, x = 0, y = 0, opacity = 0, index = null, ...args } = {}){

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
      index: i
    }));

  }

  return marbles;

}

function initializeMethod(el){

  const html = `
    <main>
      <div class="demo-init-wrapper">
        <button class="demo-init">&#9658; Play</button>
        <button class="demo-reset" hidden>Reset</button>
      </div>
      <div class="code-show">
        <button>
          <span class="arrow">&#8679;</span>
          <span class="text">Hide Code</span>
        </button>
      </div>
    </main>
    <pre class="code active"></pre>
  `

  el.setAttribute("class", "demo-container");
  el.insertAdjacentHTML(
    "afterbegin",
    html
  )

}

//>> EXAMPLE #1: push()
array_push: {

  const demoContainer      = document.querySelector("section#array-push");
  initializeMethod(demoContainer);

  const parent             = demoContainer.querySelector("main");
  marbleOptions.parent     = parent;

  const leftBracketEl   = addBracketElToParent({ id: "left-bracket" }, parent);
  const rightBracketEl  = addBracketElToParent({ id: "right-bracket", dir: "right" }, parent);
  const leftBracketEl2  = addBracketElToParent({ id: "left-bracket2" }, parent);
  const rightBracketEl2 = addBracketElToParent({ id: "right-bracket2", dir: "right" }, parent);

  const rightArrowHTML = `<div class="char" id="long-right-arrow">&xrarr;</div>`
  parent.insertAdjacentHTML("afterbegin", rightArrowHTML)

  parent.insertAdjacentHTML("afterbegin", `
    <div class="char method" id="push">
      .push(<span class="c-space"></span>)
    </div>
  `);

  const arrayMethodsVisualizedTimeline = new mojs.Timeline({ repeat: 1 });

  const circlesInput = getMarblesFromInitialX({ count: 4, index: true });
  const circlesOutput = getMarblesFromInitialX({ count: 4, index: true, xOffset: xDiff });

  const pushBallInitial = new mojs.Shape({
    ...marbleOptions,
    x: 254,
    duration: 1000,
    fill: green,
    onComplete: () => {
      console.log("onComplete()", pushBallInitial, pushBallInitial.x)
    }
  });

  const pushBall = getMarble({
    x: { 254: 666 },
    duration: 3000,
    opacity: { 0: 1 },
    fill: green,
    onComplete: () => {
      pushBall.getProps().el.setAttribute("data-index", 4);
    }

  });

  const pushJS = `
    const letters = [ "A", "B", "C", "D" ];
    letters.push( "E" );

    console.log( letters ); // [ "A", "B", "C", "D", "E" ];
  `
  demoContainer.querySelector("pre").insertAdjacentHTML(
    "beforeend",
    `<code class="language-javascript">${pushJS}</code>`
  );

  const leftBracket = new mojs.Html({
    el: leftBracketEl,
    x: leftBracketX,
    y: leftBracketY
  })
  const rightBracket = new mojs.Html({
    el: rightBracketEl,
    x: leftBracketX + ( 4 * marbleWidth ) + bracketPadding,
    y: leftBracketY,
    duration: 3000,
  })
  const leftBracket2 = new mojs.Html({
    el: leftBracketEl2,
    x: leftBracket2X,
    y: leftBracketY
  })

  const initialRightBracket2X = leftBracket2X + ( 4 * marbleWidth ) + bracketPadding;
  const rightBracket2 = new mojs.Html({
    el: rightBracketEl2,
    x: {
      [initialRightBracket2X]:
      initialRightBracket2X + marbleWidth
    },
    y: leftBracketY,
    duration: 3000,
  })

  const rightArrow = new mojs.Html({
    el: "#long-right-arrow",
    scale: 2,
    x: rightArrowX,
    y: rightArrowY,
    duration: 3000,
  })

  const push = new mojs.Html({
    el: "#push",
    x: leftBracketX + ( 4 * marbleWidth ) + bracketPadding + bracketRightMargin,
    y: leftBracketY,
    duration: 3000,
  })

  arrayMethodsVisualizedTimeline
  .add(circlesInput, circlesOutput)

  document.querySelector(".demo-init").addEventListener("click", () => {
    pushBall.play()
    rightBracket2.play();
    pushBallInitial.play();
  });

  document.querySelector(".code-show").addEventListener("click", ()=>{
    const downArrow = "&#8681;";
    const upArrow = "&#8679;";
    const preEl = document.querySelector("pre.code");
    const arrow = document.querySelector("span.arrow");
    const arrowText = document.querySelector("button span.text");
    if ( preEl.classList.contains("active")){
      arrow.innerHTML = downArrow;
      arrowText.textContent = "Show Code";
      return preEl.classList.remove("active");
    }
    arrowText.textContent = "Hide Code";
    arrow.innerHTML = upArrow;
    return preEl.classList.add("active");
  });

}

array_reverse : {

}
