const numberType = {
    // 小字组
    'Shift-1': function (cm) {cm.replaceSelection('a')},
    'Shift-2': function (cm) {cm.replaceSelection('b')},
    'Shift-3': function (cm) {cm.replaceSelection('c')},
    'Shift-4': function (cm) {cm.replaceSelection('d')},
    'Shift-5': function (cm) {cm.replaceSelection('e')},
    'Shift-6': function (cm) {cm.replaceSelection('f')},
    'Shift-7': function (cm) {cm.replaceSelection('g')},

    'Alt-1': function (cm) {cm.replaceSelection('a')},
    'Alt-2': function (cm) {cm.replaceSelection('b')},
    'Alt-3': function (cm) {cm.replaceSelection('c')},
    'Alt-4': function (cm) {cm.replaceSelection('d')},
    'Alt-5': function (cm) {cm.replaceSelection('e')},
    'Alt-6': function (cm) {cm.replaceSelection('f')},
    'Alt-7': function (cm) {cm.replaceSelection('g')},

    // 小字一组
    '1': function (cm) {cm.replaceSelection('h')},
    '2': function (cm) {cm.replaceSelection('i')},
    '3': function (cm) {cm.replaceSelection('j')},
    '4': function (cm) {cm.replaceSelection('k')},
    '5': function (cm) {cm.replaceSelection('l')},
    '6': function (cm) {cm.replaceSelection('m')},
    '7': function (cm) {cm.replaceSelection('n')},

    // 小字二组
    'Ctrl-1': function (cm) {cm.replaceSelection('o')},
    'Ctrl-2': function (cm) {cm.replaceSelection('p')},
    'Ctrl-3': function (cm) {cm.replaceSelection('q')},
    'Ctrl-4': function (cm) {cm.replaceSelection('')},
    'Ctrl-5': function (cm) {cm.replaceSelection('')},
    'Ctrl-6': function (cm) {cm.replaceSelection('')},
    'Ctrl-7': function (cm) {cm.replaceSelection('')},

    //其他
    'A': function (cm) {cm.replaceSelection('1')},
    'S': function (cm) {cm.replaceSelection('2')},
    'D': function (cm) {cm.replaceSelection('3')},
    'F': function (cm) {cm.replaceSelection('4')},
    'Z': function (cm) {cm.replaceSelection('5')},
    'X': function (cm) {cm.replaceSelection('6')},
    'C': function (cm) {cm.replaceSelection('7')},
    'V': function (cm) {cm.replaceSelection('8')},

    // 禁用
    '8': function (cm) {cm.replaceSelection('')},
    '9': function (cm) {cm.replaceSelection('')},
    'Q': function (cm) {cm.replaceSelection('')},
    'W': function (cm) {cm.replaceSelection('')},
    'E': function (cm) {cm.replaceSelection('')},
    'R': function (cm) {cm.replaceSelection('')},
    'T': function (cm) {cm.replaceSelection('')},
    'Y': function (cm) {cm.replaceSelection('')},
    'U': function (cm) {cm.replaceSelection('')},
    'I': function (cm) {cm.replaceSelection('')},
    'O': function (cm) {cm.replaceSelection('')},
    'P': function (cm) {cm.replaceSelection('')},
    'G': function (cm) {cm.replaceSelection('')},
    'H': function (cm) {cm.replaceSelection('')},
    'J': function (cm) {cm.replaceSelection('')},
    'K': function (cm) {cm.replaceSelection('')},
    'L': function (cm) {cm.replaceSelection('')},
    'B': function (cm) {cm.replaceSelection('')},
    'N': function (cm) {cm.replaceSelection('')},
    'M': function (cm) {cm.replaceSelection('')},


    '0': function (cm) {
        cm.replaceSelection('_')
    }




}

const pinYingType = {
    // 小字组
    'Shift-S': function (cm) {cm.replaceSelection('a')},
    'Shift-C': function (cm) {cm.replaceSelection('b')},
    'Shift-G': function (cm) {cm.replaceSelection('c')},
    'Shift-F': function (cm) {cm.replaceSelection('d')},
    'Shift-L': function (cm) {cm.replaceSelection('e')},
    'Shift-W': function (cm) {cm.replaceSelection('f')},
    'Shift-Y': function (cm) {cm.replaceSelection('g')},

    'Alt-S': function (cm) {cm.replaceSelection('a')},
    'Alt-C': function (cm) {cm.replaceSelection('b')},
    'Alt-G': function (cm) {cm.replaceSelection('c')},
    'Alt-F': function (cm) {cm.replaceSelection('d')},
    'Alt-L': function (cm) {cm.replaceSelection('e')},
    'Alt-W': function (cm) {cm.replaceSelection('f')},
    'Alt-Y': function (cm) {cm.replaceSelection('g')},

    'H': function (cm) {cm.replaceSelection('e')},
    'A': function (cm) {cm.replaceSelection('f')},
    'I': function (cm) {cm.replaceSelection('g')},


    // 小字一组
    'S': function (cm) {cm.replaceSelection('h')},
    'C': function (cm) {cm.replaceSelection('i')},
    'G': function (cm) {cm.replaceSelection('j')},
    'F': function (cm) {cm.replaceSelection('k')},
    'L': function (cm) {cm.replaceSelection('l')},
    'W': function (cm) {cm.replaceSelection('m')},
    'Y': function (cm) {cm.replaceSelection('n')},

    // 小字二组
    'Ctrl-S': function (cm) {cm.replaceSelection('o')},
    'Ctrl-C': function (cm) {cm.replaceSelection('p')},
    'Ctrl-G': function (cm) {cm.replaceSelection('q')},
    'Ctrl-F': function (cm) {cm.replaceSelection('')},
    'Ctrl-L': function (cm) {cm.replaceSelection('')},
    'Ctrl-W': function (cm) {cm.replaceSelection('')},
    'Ctrl-Y': function (cm) {cm.replaceSelection('')},

    // 其他
    //  气口 /
    //  叠腔 .
    //  撮腔 *
    //  擞腔 -
    //  豁腔 +

    // 禁用
    'Q': function (cm) {cm.replaceSelection('')},
    'E': function (cm) {cm.replaceSelection('')},
    'R': function (cm) {cm.replaceSelection('')},
    'T': function (cm) {cm.replaceSelection('')},
    'U': function (cm) {cm.replaceSelection('')},
    'O': function (cm) {cm.replaceSelection('')},
    'P': function (cm) {cm.replaceSelection('')},
    'D': function (cm) {cm.replaceSelection('')},
    'J': function (cm) {cm.replaceSelection('')},
    'K': function (cm) {cm.replaceSelection('')},
    'Z': function (cm) {cm.replaceSelection('')},
    'X': function (cm) {cm.replaceSelection('')},
    'V': function (cm) {cm.replaceSelection('')},
    'B': function (cm) {cm.replaceSelection('')},
    'N': function (cm) {cm.replaceSelection('')},
    'M': function (cm) {cm.replaceSelection('')},

    // 板眼
    '0': function (cm) {
        if (window.banyanIndex >= window.banyan.length)
            window.banyanIndex = 0
        cm.replaceSelection(window.banyan[window.banyanIndex++])
    }

}

export {
    numberType,
    pinYingType
}
