import mojs from 'src/mojs.babel.js';
import MojsPlayer from '@mojs/player';

const orange  = "#f59d56";
const green   = "#aded94";
const magenta = "#bd81fb";
const red     = "#ee695a"

const parent             = document.getElementById("app");
const xDiff              = 536 - 22;
const leftBracketX       = 22;
const leftBracketY       = 84;
const leftMarbleX        = 64;
const marbleRadius       = 16;
const marbleWidth        = 38;
const bracketPadding     = 14;
const bracketRightMargin = 22;

const circleOptions = {
  parent,
  className: "mojs-marble",
  radius: marbleRadius,
  isShowStart: true,
  left: leftMarbleX,
  top: 100,
  y: 0
}

function addBracketEl({ id, dir = "left" }){

  const bracketEl = document.createElement("div");
  bracketEl.setAttribute("class", "char");
  if ( id ) {
    bracketEl.setAttribute("id", id);
  }
  bracketEl.textContent = dir === "left" ? "[" : "]";
  parent.appendChild(bracketEl);
  return bracketEl;

}

// CREATING HTML ELEMENTS:
const leftBracketEl = addBracketEl({ id: "left-bracket" });
const rightBracketEl = addBracketEl({ id: "right-bracket", dir: "right" });
const leftBracketEl2 = addBracketEl({ id: "left-bracket2" });
const rightBracketEl2 = addBracketEl({ id: "right-bracket2", dir: "right" });

const rightArrowHTML = `<div class="char" id="long-right-arrow">&xrarr;</div>`
parent.insertAdjacentHTML("afterbegin", rightArrowHTML)

parent.insertAdjacentHTML("afterbegin", `
  <div class="char method" id="push">
    .push(<span class="c-space"></span>)
  </div>
`);

// INITIALIZING MOJS OBJECTS:
const arrayMethodsVisualizedTimeline = new mojs.Timeline({
  repeat: 1
})

const circlesInput  = [];
const circlesOutput = [];

function getMarble({ fill = orange, x = 0, y = 0, opacity = 0, index = null } = {}){

  return new mojs.Shape({
    ...circleOptions,
    x,
    opacity: 1,
    fill,
    attrs: typeof index === "number" ? [{ "data-index": index }] : null,
  })

}

// PREPARE INPUT BALLS:
for (let i = 0; i < 4; i++) {

  circlesInput.push(getMarble({
    x: i === 3 ? { [i * marbleWidth]: 300 } : i * marbleWidth,
    fill: i === 4 ? green : orange,
    index: i
  }));

}

// PREPARE OUTPUT BALLS:
for (let i = 0; i < 4; i++) {

  circlesOutput.push(getMarble({
    x: (i * marbleWidth) + xDiff,
    fill: orange,
    index: i
  }));

}

const pushBallInitial = new mojs.Shape({
  ...circleOptions,
  x: 254,
  duration: 1000,
  fill: green,
  onComplete: () => {
    console.log("onComplete()", pushBallInitial, pushBallInitial.x)
  }
});

const pushBall = new mojs.Shape({
  ...circleOptions,
  x: { 254: 666 },
  duration: 3000,
  opacity: { 0: 1 },
  fill: green,
  onComplete: () => {
    pushBall.getProps().el.setAttribute("data-index", 4);
  }
})

const leftBracket = new mojs.Html({
  el: leftBracketEl,
  x: leftBracketX,
  y: leftBracketY
})
console.log(leftBracketEl)
const rightBracket = new mojs.Html({
  el: rightBracketEl,
  x: leftBracketX + ( 4 * marbleWidth ) + bracketPadding,
  y: leftBracketY,
  duration: 3000,
})
const leftBracket2 = new mojs.Html({
  el: leftBracketEl2,
  x: 536,
  y: 84
})
const rightBracket2 = new mojs.Html({
  el: rightBracketEl2,
  // x: 740,
  x: 702,
  x: { 702: 740 },
  y: 84,
  duration: 3000,
})

const rightArrow = new mojs.Html({
  el: "#long-right-arrow",
  // el: rightArrowEl,
  scale: 2,
  x: 460,
  y: 76,
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

// reverse()

