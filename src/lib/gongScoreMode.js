CodeMirror.defineSimpleMode("gongscore", {
    // The start state contains the rules that are intially used
    start: [
        // 小一号谱
        {regex: /([a-q])(_)/, token: ['spu', 'none']},
        // 谱
        {regex: /([a-q])/, token: 'pu'},
        // 板眼
        {regex: /([1-8])/, token: 'by'},
        // 腔调
        {regex: /([\/\*\-\+\.])/, token: 'qiang'},
        // 空格
        {regex: /[ ]+/, token: 'space'},
        // 多空格
        // {regex: /[ {2,}]/, token: 'error'},
        {regex: /[^a-q1-8xyz]/, token: 'error'}
        ],
    // specific to simple modes.
    meta: {
        dontIndentStates: ["comment"],
        lineComment: "//"
    }
});
