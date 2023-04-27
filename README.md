# mini-webpack
webpack 实现


一、基于文件内容 和依赖关系 构建一个图
    1、获取内容
    2、获取对应的依赖关系

二、基于图 生成脚本 


"type": "module", 支持 esm 模块


1、使用 ejs 生成 模版 ：boundle.ejs 是模板，生成——> boundle.js
2、在 整个的编译过程中 用到了 parser traverse transformFromAst tapable

parser的作用 是 生成 ast 

traverse 根据ast 分析依赖关系
transformFromAst  将 ast 转译为 code 并在转移的返回值获取到 依赖文件被转 转译的代码

tapable 是有多中注册回调方式的 钩子   ，会在 打包的每一个节点 注册钩子 ，plugin 会使用 hook 监听的 打包过程中 的 一些节点，通过这些节点获取到数据  并使用  函数 修改  成 我们想要 打包结果


