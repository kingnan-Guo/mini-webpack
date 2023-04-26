import fs from "fs";
import parser from "@babel/parser";
import traverse from "@babel/traverse";
import { log } from "console";
import path from "path";
import ejs from "ejs";
import { transformFromAst } from "babel-core"

let id = 0
/**
 * 
 * 1、获取内容
 * 2、获取对应的依赖关系
 *  ast -> 获取内容
 */
function createAsset(filePath) {
    //  1、获取内容
    const source = fs.readFileSync(filePath, {
      encoding: "utf-8"
    })
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
log(graph)


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
  console.log(data)

  const code = ejs.render(template, {data})
  fs.writeFileSync("./dist/boundle.js", code)
  console.log(code);
  
}
build(graph)