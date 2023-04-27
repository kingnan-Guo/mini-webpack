/**
 * 改变打包路径
 */
export class changeOutPutPath{
    constructor(){

    }
    apply(hooks){
        hooks.emitFlie.tap("changeOutPutPath", (context) => {
            console.log("----changeOutPutPath-----");
            console.log("context =", context);
            context.changeOutPutPath("./newDist/boundle.js")
        })
    }
}