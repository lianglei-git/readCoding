/**
 * 
 * @cmd pnpm babel --plugins @babel/plugin-syntax-jsx babel__tests__/jsx/index.tsx --out-file script-compiled.js
 */

const Element = () => /*#__PURE__*/React.createElement("div", null, "9999");
const p = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, "100101"), /*#__PURE__*/React.createElement("a", {
  class: "shide"
}, "tiaozhuan"), /*#__PURE__*/React.createElement(Element, null));
export {};
