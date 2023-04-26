import { 
	SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
	AsyncParallelHook,
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesWaterfallHook
} from "tapable";


class List{
    constructor(){

    }
    getRoutes(){

    }
}

class Car {
	constructor() {
		this.hooks = {
			accelerate: new SyncHook(["newSpeed"]),
			brake: new SyncHook(),
			calculateRoutes: new AsyncParallelHook(["source", "target", "routesList"])
		};
	}
	setSpeed(newSpeed) {
		// following call returns undefined even when you returned values
		this.hooks.accelerate.call(newSpeed);
	}

	useNavigationSystemPromise(source, target) {
		const routesList = new List();
		return this.hooks.calculateRoutes.promise(source, target, routesList).then((res) => {
			// res is undefined for AsyncParallelHook
			return routesList.getRoutes();
		});
	}

	useNavigationSystemAsync(source, target, callback) {
		const routesList = new List();
		this.hooks.calculateRoutes.callAsync(source, target, routesList, err => {
			if(err) return callback(err);
			callback(null, routesList.getRoutes());
		});
	}


}

/**
 * 1、 注册事件
 * 
 */

const car = new Car();
// 通过 tap 注册
car.hooks.accelerate.tap("test 1", (res) => {
    console.log("accelerate res", res);
})

// 执行完所有 的异步回调  再去执行 
car.hooks.calculateRoutes.tapPromise("test 2 <promise>", (source, target) => {
    // console.log("calculateRoutes tapPromise ", source, target);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("tapPromise ", source);
            resolve()
        }, 10)
    })

})


// 2、 触发事件
car.setSpeed("one")
car.useNavigationSystemPromise([1, 2, 4], "two")
