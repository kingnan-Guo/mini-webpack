
(function (modules) {
    function _webpack_require(filePath){
        const fn = modules[filePath]
        const module = {
            exports:{}
        }
        fn(_webpack_require, module, module.exports)
        return module.exports
    }
    
    _webpack_require("./main.js")

})({
    
        
        "./example/main.js": function (_webpack_require, module, exports) {
            "use strict";

var _foo = require("./foo.js");

var _foo2 = _interopRequireDefault(_foo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const  a = request("./foo")
(0, _foo2.default)(); // import { request } from "http";

console.log("--main--");
        },
    
        
        "/Users/kingnan/Documents/github/mini-webpack/example/foo.js": function (_webpack_require, module, exports) {
            "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = foo;

var _bar = require("bar.js");

function foo() {
  console.log("--- foo ---");
}
        },
    
        
        "/Users/kingnan/Documents/github/mini-webpack/example/bar.js": function (_webpack_require, module, exports) {
            "use strict";
        },
    


});



    