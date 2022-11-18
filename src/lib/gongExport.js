
class GongExport {
    hashKey = {
        'a': '上-',
        'b': '尺-',
        'c': '工-',
        'd': '凡-',
        'e': '合',
        'f': '四',
        'g': '一',
        'h': '上',
        'i': '尺',
        'j': '工',
        'k': '凡',
        'l': '六',
        'm': '五',
        'n': '乙',
        'o': '上+',
        'p': '尺+',
        'q': '工+',

        // 'x': 'd',
        // 'y': 'h',
        // 'z': 's',

        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '6',
        '6': '7',
        '7': '5',
        '8': '8',

        '.': 'd',
        '/': '/',
        '*': 'c',
        '-': 's',
        '+': 'h'
    }

    translate(lyricTokens, scoreTokens) {
        console.log(lyricTokens, scoreTokens)
        let text = []
        lyricTokens.forEach((line, index) => {
            line.forEach((item, itemIndex) => {
                switch (item.type) {
                    case 'title':
                        text.push(`#${item.text}`)
                        break
                    case 'ci':
                        let pu = []
                        if (scoreTokens[index] != undefined && scoreTokens[index][itemIndex] != undefined) {
                            scoreTokens[index][itemIndex].forEach(puItem => {
                                if (puItem.type == 'spu')
                                    pu.push(`(${this.hashKey[puItem.text]})`)
                                else
                                    pu.push(this.hashKey[puItem.text])
                            })
                            pu = pu.join('')
                        } else pu = ''
                        text.push(`${item.text}{${pu}}`)
                        break
                    case 'pai':
                        text.push(item.text)
                        break
                    case 'diao':
                        text[text.length-1] = `${text[text.length-1]}(${item.text})`
                        break
                    case 'jia':
                        text.push(`>${item.text}`)
                        break
                    case 'nian':
                        text.push(`=${item.text}`)
                        break
                    case 'comment':
                        text.push(item.text.replace('//', ';'))

                }
            })
        })
        return text.join('\n')
    }
}

export default GongExport

