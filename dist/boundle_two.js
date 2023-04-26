
(function (modules) {
    function _webpack_require(id){
        const [fn, mapping] = modules[id]
        const module = {
            exports:{}
        };
        // 进行转换
        function localRequire(filePath) {
            console.log("localRequire = filePath =", filePath);
            const id = mapping[filePath];
            return  _webpack_require(id)
        }
        fn(localRequire, module, module.exports)
        return module.exports
    }
    
    // _webpack_require("./main.js")
    _webpack_require(1)

})({
    // "./example/main.js"
    1:[ function (_webpack_require, module, exports) {
        "use strict";
        var _foo = _webpack_require("./foo.js");
        var _foo2 = _interopRequireDefault(_foo);
        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
        // const  a = request("./foo")
        (0, _foo2.default)(); // import { request } from "http";
        console.log("--main--");
    },{
        "./foo.js": 2
    }],
    // "/Users/kingnan/Documents/github/mini-webpack/example/foo.js"
    2:[ function (_webpack_require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", { value: true });
            exports.foo = foo;
            // var _bar = require("bar.js");
            function foo() {
                console.log("--- foo ---");
            }
    },{

    }],
    // "/Users/kingnan/Documents/github/mini-webpack/example/bar.js": function (_webpack_require, module, exports) {
    //     "use strict";
    // },
    
});



    