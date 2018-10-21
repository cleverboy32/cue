// import app from './app.cue';
var fs = require('fs');
var render = require('json-templater/string');
var path = require('path');


const cue = fs.readFileSync(path.resolve(__dirname, './app.cue'), 'utf-8');

let script = cue.match(/\<script\>/);
let html = cue.slice(0, script.index).replace(/\s/g, '');

script = cue.slice(script.index);
script = script.replace(/\<script\>/g, '');
script = script.replace(/\<\/script\>/g, '');

let options = script.replace(/export default {/g, 'let cm = {');

var OUTPUT_PATH = path.join(__dirname, './cue-template.js');

var TemPlate = `
const Cue = {
    content: '{{html}}',
};

{{options}}

export {
    Cue,
    cm
}
`

var template = render(TemPlate, {
    html,
    options
});

fs.writeFileSync(OUTPUT_PATH, template);

console.log('[build entry] DONE:', OUTPUT_PATH);