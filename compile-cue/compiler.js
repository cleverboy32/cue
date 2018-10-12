import { stack as template, options } from './template.js';
import Watcher from './observerble.js'

// let content;

// 渲染根元素
let root = template.children[0]; // 只能有一个根元素
let rootEle = document.createElement(root.tagName);
for (let attr of root.attrs) {
    rootEle.setAttribute(attr.name, attr.value);
}
rootEle.innerText = root.text;


let data = options.data();

// 数据监听
console.log(Watcher);













function genarateDom (root, rootEle) {
    let nodes = root.children; // 根元素下的子元素
    nodes.map((item) => {
        let ele = document.createElement(item.tagName);
        for (let attr of item.attrs) {
            let event = attr.name.match(/^@(.*)/);
            if (event) { //是事件
                ele.addEventListener(event[1], options.methods[attr.value]);
            } else {
                ele.setAttribute(attr.name, attr.value);
            }
        }

        // 替换变量
        item.text = item.text.replace(/{{(.*)}}/g, ($1, $2) => {
            return ' ' + data[$2];
        })

        ele.innerText = item.text;

        if (item.children) {
            genarateDom(item, ele);
        } else {
            rootEle.appendChild(ele);
        }
    });
}
  
genarateDom(root, rootEle);

let wrap = document.querySelector('#app');
wrap.innerHTML = '';
wrap.append(rootEle);
