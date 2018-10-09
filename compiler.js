import template from './template.js';

console.log(template);

let content = template.template;
let wrap = document.querySelector('#app');
wrap.innerHTML = content;