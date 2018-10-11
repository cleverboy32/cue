// 观察data 中所有对象， 当值改变时，通知watcher ,触发视图更新

class Dep {
    constructor () {
        this.subs = [];
    }

    addSub (Watcher) {
        this.subs.push(Watcher);
    }
    depend () {
        if (Dep.target) {
            Dep.target.addDep(this);
        }
    }

    notify () {
        const subs = this.subs.slice()
	    for (let i = 0, l = subs.length; i < l; i++) {
	      subs[i].update()
	    }
    }
}

//如果有一个程序员 他很认真的在敲键盘 那他可能不是在

// 为Dep.target 赋值
function pushTarget(Watcher) {
    Dep.target = Watcher
}


class Watcher {// 观察者对象
    constructor (getter) {
        this.newDeps = [];
        this.getter = getter;
        this.value =this.get();
    }

    get () {
        pushTarget(this);
	    let value = this.getter();
	    return value;
    }

    addDep (dep) {
        this.newDeps.push(dep);
        dep.addSub(this);
    }

    update () {
	    this.run()
    }
    
    run (){
        console.log(3333);
		console.log(this.value);
	}

    notify (deps) {
        for (let i = 0; i < deps.length; i++) {
            deps[i].update();
        }
    }
}

// 有子对象
function observe(value){
	if(typeof(value) != 'object' ) return;
	let ob = new Observer(value)
  	return ob;
}

class Observer {
    constructor (value) {
        this.value = value;
        this.dep = new Dep();
        let keys = Object.keys(value);
        
        for (let i = 0; i < keys.length; i++) {

            // 处理子对象
            const dep = new Dep ();
            let childOb = observe(value[keys[i]]);
            let keyV = value[keys[i]];

            Object.defineProperty(value, keys[i], {
                enumerable: true,
    	        configurable: true,
                set (newVal) {
                    keyV = newVal;
                    childOb = observe(newVal); // 对新值赋值
                    dep.notify();
                },
                get () {
                    if (Dep.target) {
                        dep.depend();

                        if (childOb) {
                            childOb.dep.depend()
                        }
                    }
                    return keyV;
                }
            });
        }
    }
}

let data = {
    name:'zane',
    blog:'https://blog.seosiwei.com/',
    hobby:['basketball','football'],
    list:[
        {name:'zhangsan'},
        {name:'lishi'}
    ]
}

const vm = { data: data };

new Watcher(() => {
    return vm;
});
observe(data)
console.log(data.name);
data.name = 'wyz';
let a = data;
console.log(a, 44);
