export function jsonLoader(source) {
    console.log("---- jsonLoader -----");
    console.log("source =", source);
    // 正常情况下 这里的this 只想 对loader 的option
    // 现在这里的this -> loaderContext
    this.addDeps("jsonLoader")
    return `export default ${JSON.stringify(source)}`
}