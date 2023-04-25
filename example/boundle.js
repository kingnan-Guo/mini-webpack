
/**
 * 使用 cjs 思路处理模块 
 *  import foo from "./foo.js"; -> const  foo = request("./foo")
 *  export function foo(){ } -> function foo() module.exports { foo}
 * 
 * 
 */
(function (modules) {
    function _webpack_require(filePath){
        // const map = {
        //     "./foo.js": foojs,
        //     "./main.js": mainjs
        // }
        const fn = modules[filePath]
        const module = {
            exports:{}
        }
        fn(_webpack_require, module, module.exports)
        return module.exports
    }
    
    _webpack_require("./main.js")

})({
    "./main.js": function (_webpack_require, module, exports) {
        // import foo from "./foo.js";
        const {foo} = _webpack_require("./foo.js")
        foo()
        console.log("--main--");
    },
    "./foo.js": function (_webpack_require, module, exports) {
        // export function foo(){
        //     console.log("foo");
        // }
        function foo(){
            console.log("--foo---");
        }
        module.exports = {
            foo
        }
    }
})



    