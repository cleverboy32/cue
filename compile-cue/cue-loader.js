// import app from './app.cue';
var fs = require('fs');
var render = require('json-templater/string');
var path = require('path');


const cue = fs.readFileSync(path.resolve(__dirname, './app.cue'), 'utf-8').replace(/\s/g, '');
var OUTPUT_PATH = path.join(__dirname, './cue-template.js');

var TemPlate = `
const Cue = {
    content: "{{cue}}"
};

module.exports = {
    Cue
}
`

var template = render(TemPlate, {
    cue
});

fs.writeFileSync(OUTPUT_PATH, template);

console.log('[build entry] DONE:', OUTPUT_PATH);