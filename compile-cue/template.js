import {Cue as template, cm as options} from './cue-template.js';

let html = template.content;

// Regular Expressions for parsing tags and attributes
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const ncname = '[a-zA-Z_][\\w\\-\\.]*'
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`);
const startTagClose = /^\s*(\/?)>/;
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);

let htmlDom = [];

let flag = true;

function advance (n) {
    index += n
    html = html.substring(n)
}

function parseStartTag () {
    let start = html.match(startTagOpen);

    if (start) {
        const match = {
            tagName: start[1],
            attrs: [],
            start: index
        }
        advance(start[0].length)
        let end, attr
        while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
            advance(attr[0].length)
            match.attrs.push(attr)
        }
        if (end) {
            match.unarySlash = end[1]
            advance(end[0].length)
            match.end = index
            return match
        }
    }
}

function handleStartTag (match) {
    const tagName = match.tagName;

    let textEnd = html.indexOf('<'); // 下一个标签或结束标签的位置
    let text, rest, next;
    if (textEnd >= 0) {
        rest = html.slice(textEnd);
        text = html.substring(0, textEnd);
        advance(textEnd);
        match.text = text;
    }

    // 解析属性
    const l = match.attrs.length
    const attrs = new Array(l)
    for (let i = 0; i < l; i++) {
        const args = match.attrs[i]
        // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
        if (args[0].indexOf('""') === -1) {
            if (args[3] === '') { delete args[3] }
            if (args[4] === '') { delete args[4] }
            if (args[5] === '') { delete args[5] }
        }
        const value = args[3] || args[4] || args[5] || ''
        attrs[i] = {
            name: args[1],
            value: value
        }
    }

    match.attrs = attrs;
    return match;
}

const stack = []; //用来存储接口的变量
let cachestack = stack; // 用来存储当前节点的变量

let index = 0;
let lastTag;
while (html) {
    // 首先进行标签匹配, 并剪切开始标签
    let match = parseStartTag();
    if (match) {
        lastTag = match.tagName;
        match = handleStartTag(match); // 一个父标签的信息

        const endTagMatch = html.match(endTag);
        if (endTagMatch) {
            const curIndex = index
            advance(endTagMatch[0].length)
            if (endTagMatch[1] === lastTag) { // 是当前标签结束
                cachestack.push(match);
            }
            continue;
        } else { // 父标签包含的是子标签
            if (match.tagName !== 'template') {
                match.children = [];
                cachestack.children = [match];
                cachestack = match.children;
            }
        }
    } else { // 没有了起始标签
        const endTagMatch = html.match(endTag);
        if (endTagMatch) {
            const curIndex = index
            advance(endTagMatch[0].length)
            continue;
        }
    }
    
}

export {
    stack,
    options
}