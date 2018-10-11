import template from './template.js';

// let content;

// 渲染根元素
let root = template.children[0]; // 只能有一个根元素
let rootEle = document.createElement(root.tagName);
for (let attr of root.attrs) {
    rootEle.setAttribute(attr.name, attr.value);
}
rootEle.innerText = root.text;


function genarateDom (root, rootEle) {
    let nodes = root.children; // 根元素下的子元素
    nodes.map((item) => {
        let ele = document.createElement(item.tagName);
        for (let attr of item.attrs) {
            let event = attr.name.match(/^@(.*)/);
            if (event) { //是事件
                
                console.log(event);
            } else {
                ele.setAttribute(attr.name, attr.value);
            }
        }
        ele.innerText = item.text;

        if (item.children) {
            genarateDom(item, ele);
        } else {
            rootEle.appendChild(ele);
        }
    });
}
  
genarateDom(root, rootEle);

let content = template.template;
let wrap = document.querySelector('#app');
wrap.innerHTML = '';
wrap.append(rootEle);
