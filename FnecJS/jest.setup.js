// setup.js
const path = require('path');
const transpilerModule = require(path.resolve(__dirname, './packages/fnec-transpiler'));

// If the transpiler exports FnecTranspiler as a named export
if (transpilerModule.FnecTranspiler) {
  global.FnecTranspiler = transpilerModule.FnecTranspiler;
} 
// If the transpiler exports FnecTranspiler as the default export
else if (transpilerModule.default && transpilerModule.default.FnecTranspiler) {
  global.FnecTranspiler = transpilerModule.default.FnecTranspiler;
}
// If the module itself is the FnecTranspiler class
else {
  global.FnecTranspiler = transpilerModule;
}