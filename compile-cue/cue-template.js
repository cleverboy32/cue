
const Cue = {
    content: `<template><div><p>hello{name}!</p><button@click="change">改变视图</button></div></template><script>exportdefault{data(){return{name:'world'}},methods:{change(){this.name='clever';}}}</script>`
};

export default Cue;
