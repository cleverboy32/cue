
const Cue = {
    content: '<template><div><p>hello{{name}}!</p><button@click="change">改变视图</button></div></template>',
};


let cm = {
    data() {
        return {
            name: 'world'
        }
    },
    methods: {
        change () {
            this.name = 'clever';
        }
    }
}


export {
    Cue,
    cm
}
