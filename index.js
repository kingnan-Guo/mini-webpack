import fs from "fs";
import parser from "@babel/parser";
import traverse from "@babel/traverse";
import { log } from "console";
import path from "path";
import ejs from "ejs";
import { transformFromAst } from "babel-core"
import { jsonLoader } from "./jsonLoader.js";
import { changeOutPutPath } from "./changeOutPutPath.js";
import { SyncHook } from "tapable";
let id = 0

const webpackConfig = {
  module:{
    rulers:[{
      test:/\.json$/,
      use:[jsonLoader],
    }]
  },
  plugins:[new changeOutPutPath()]
}

const hooks = {
  emitFlie: new SyncHook(["context"])
}

/**
 * 
 * 1、获取内容
 * 2、获取对应的依赖关系
 *  ast -> 获取内容
 */
function createAsset(filePath) {
    //  1、获取内容
    let source = fs.readFileSync(filePath, {
      encoding: "utf-8"
    })
    console.log(" ------ source -----");
    log(source)
    // 在此处 接收到的 source 进行转换 ，但现在只转换 json
    const loaders = webpackConfig.module.rulers
    const loaderContext = {
      addDeps(dep){
        console.log("addDeps", dep);
      }
    }
    loaders.forEach(({test, use}) => {
        // 匹配正则
        if (test.test(filePath)) {
          if (Array.isArray(use)) {
            // loader 从后向前 执行 ,所以 reverse
            console.log("use =", use);
            use.reverse().forEach((fn) => {
              source = fn.call(loaderContext, source)
            })
          } else {
            source = use.call(loaderContext, source)
          }
          
        }
    });




    // 2、获取对应的依赖关系
    const ast = parser.parse(source, {
      sourceType: "module"
    })
    // console.log(ast);
    // 存储依赖关系 dep
    const deps = []
    // esm -> cjs
    traverse.default(ast, {
      // 当调用到 ImportDeclaration  节点的时候 会调用到 ImportDeclaration()函数
      ImportDeclaration({ node }) {
        // log("ImportDeclaration--------\n", node.source.value);
        deps.push(node.source.value)
      }
    });

    const code = transformFromAst(ast, null, {
      presets: ["env"]
    })
    // log("------------code------------------")
    // console.log(code);
    return {
      filePath,
      // source,
      code,
      deps,
      id: id++,
      mapping: {}
    }
}

// const asset = createAsset()
// console.log(asset);

/**
 * 获取 图
 */
function createGraph() {
  const mainAsset = createAsset("./example/main.js")
  // 基于依赖关系 找到下一个模块
  const queue = [mainAsset]
  for (const asset of queue) {
    asset.deps.forEach((relativePath) => {
      // example/foo.js
      const child = createAsset(path.resolve("./example", relativePath))
      // log(child)
      asset.mapping[relativePath] = child.id
      queue.push(child)
    });
  }
  return queue
}
const graph = createGraph()
log("------------graph------------------")
// log(graph)


/**
 * 初始话plugin
 */
function initPlugins() {
  const plugins = webpackConfig.plugins
  plugins.forEach((plugin) => {
    plugin.apply(hooks)
  });
}
initPlugins()

function build(graph) {
  // 使用ejs 生成文件
  const template = fs.readFileSync('./boundle.ejs', {
    encoding: 'utf-8'
  })


  const data = graph.map((asset)=>{
    const {filePath, code, id, mapping} = asset
    return {
      filePath: filePath,
      code: code.code,
      id: id,
      mapping: mapping
    }
  })
  // console.log(data)

  const code = ejs.render(template, {data})


  let outPutPath  = "./dist/boundle.js"
  const context = {
    changeOutPutPath(path){
      console.log("changeOutPutPath =", path);
      outPutPath = path
    }
  }
  hooks.emitFlie.call(context)


  
  fs.writeFileSync(outPutPath, code)
  // console.log(code);
  
}
build(graph)