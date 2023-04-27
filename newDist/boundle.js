
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

var _user = require("./user.json");

var _user2 = _interopRequireDefault(_user);

var _foo = require("./foo.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import foo from "./foo.js";
// const  a = request("./foo")
// foo.foo()
console.log("user", _user2.default); // -----------

(0, _foo.foo)();
console.log("--main--");
            },
            {"./user.json":1,"./foo.js":2}
            ],
    
        
        "1": 
            [function (require, module, exports) {
                "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "{\n    \"name\": \"kingnan\",\n    \"level\": \"low\"\n}";
            },
            {}
            ],
    
        
        "2": 
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
            {"bar.js":3}
            ],
    
        
        "3": 
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



    