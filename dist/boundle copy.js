
(function (modules) {
    function require(id){
        const [fn, mapping] = modules[id]
        const module = {
            exports:{}
        }
        function localRequire(filePath) {
            const id = mapping[filePath];
            return  require(id)
        }
        fn(localRequire, module, module.exports)
        return module.exports
    }
    require(0)

})({
    
        
        "0": 
            [function (require, module, exports) {
                "use strict";

                var _foo = require("./foo.js");

                var _foo2 = _interopRequireDefault(_foo);

                function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

                // const  a = request("./foo")
                _foo2.foo(); // import { request } from "http";

                console.log("--main--");
            },
            {"./foo.js":1}
            ],
    
        
        "1": 
            [function (require, module, exports) {
                "use strict";

                Object.defineProperty(exports, "__esModule", {
                  value: true
                });
                exports.foo = foo;

                var _bar = require("bar.js");

                function foo() {
                  console.log("--- foo ---");
                  (0, _bar.bar)();
                }
            },
            {"bar.js":2}
            ],
    
        
        "2": 
            [function (require, module, exports) {
                "use strict";

                Object.defineProperty(exports, "__esModule", {
                  value: true
                });
                exports.bar = bar;

                function bar(params) {
                  console.log("-- bar --");
                }
            },
            {}
            ],
    


});



    