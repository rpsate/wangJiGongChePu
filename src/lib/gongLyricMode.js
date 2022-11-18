CodeMirror.defineSimpleMode("gonglyric", {
    // The start state contains the rules that are intially used
    start: [
        {regex: /[，。？！,.?!、…]/, token: 'biao'},
        // 标题
        {regex: /(^\#\s*)([^，^。^？^！^,^.^?^!^、^…^#^@^$^￥^x-y^X-y^0-9]+)/, token: [null, "title"], sol:true},
        // 念白
        {regex: /(^\=\s*)([（|）|\(|\)\u2E80-\u9FFF]+)/, token: [null, 'nian'], sol: true},
        // 夹白
        {regex: /(^[（\(][^，^。^？^！^,^.^?^!^、^…^#^@^$^￥^x-y^X-y^0-9]+?[）\)])/, token: 'jia'},
        {regex: /(^\>\s*)([^，^。^？^！^,^.^?^!^、^…^#^@^$^￥^x-y^X-y^0-9]+)/, token: [null, 'jia'], sol: true},
        // 曲牌 调号
        {regex: /(^[【\[][^，^。^？^！^,^.^?^!^、^…^#^@^$^￥^x-y^X-y^0-9]+?[】\]])([^，^。^？^！^,^.^?^!^、^…^#^@^$^￥^x-y^X-y^0-9]*)/, token: ['pai', 'diao'], sol: true},
        // 唱词
        {regex: /[^，^。^？^！^,^.^?^!^、^…^#^@^$^￥^x-y^X-y^0-9]+/, token: 'ci'},
        //标点
        {regex: /\/\/.*/, token: "comment"},
        {regex: /.*/, token: 'error'}
    ],
    // specific to simple modes.
    meta: {
        dontIndentStates: ["comment"],
        lineComment: "//"
    }
});
