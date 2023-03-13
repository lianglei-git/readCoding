import JsxRender, {createElement} from "./element.js";

const Element = () => /*#__PURE__*/ createElement("div", null, "9999");
const p = /*#__PURE__*/ createElement("div", null, /*#__PURE__*/ createElement("p", null, "100101"), /*#__PURE__*/ createElement("a", {
  class: "shide"
}, "tiaozhuan"), /*#__PURE__*/ createElement(Element, null));


// const p = createElement('div', null, [
//     createElement('span', {class: 'duide'}, 999),
//     createElement('b', {class: 'two'},'祖逖' ),
// ])

JsxRender(p, {})