
/**
 * 使用 cjs 思路处理模块 
 *  import foo from "./foo.js"; -> const  foo = request("./foo")
 *  export function foo(){ } -> function foo() module.exports { foo}
 * 
 * 
 */
(function (modules) {
    function _webpack_require(id){
        // const map = {
        //     "./foo.js": foojs,
        //     "./main.js": mainjs
        // }
        
        // const fn = modules[filePath]
        const [fn, mapping] = modules[id]
        const module = {
            exports:{}
        }
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
    1:[ function (_webpack_require, module, exports) {
        // import foo from "./foo.js";
        const {foo} = _webpack_require("./foo.js")
        foo()
        console.log("--main--");
    }, {
        "./foo.js": 2
    }],
    2: [function (_webpack_require, module, exports) {
        // export function foo(){
        //     console.log("foo");
        // }
        function foo(){
            console.log("--foo---");
        }
        module.exports = {
            foo
        }
    }, {}]
})



    