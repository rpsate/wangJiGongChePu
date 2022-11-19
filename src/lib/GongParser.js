import {esLint} from "@codemirror/lang-javascript";

class GongParser {
    hashKey = {
        '.': 'x',
        '/': '5',
        '*': 'x',
        '-': 'z',
        '+': 'y'
    }

    lyricParse(tokens) {
        let res = []
        for (let i=0; i<tokens.length; i++) {
            if (!tokens[i].type) continue
            switch (tokens[i].type) {
                case 'title':
                    res.push({type: 'title', text: tokens[i].string})
                    break
                case 'jia':
                    res.push({type: 'jia', text: tokens[i].string})
                    break
                case 'nian':
                    res.push({type: 'nian', text: tokens[i].string})
                    break
                case 'pai':
                    let pai = {type: 'pai', text: tokens[i].string, diao: null}
                    if (tokens.length > i+1 && tokens[i+1].type == 'diao') {
                        pai.diao = tokens[++i].string
                    }
                    res.push(pai)
                    break
                case 'ci':
                    for (let j=0;j<tokens[i].string.length;j++) {
                        res.push({type: 'ci', text: tokens[i].string[j], pu: []})
                    }
            }
        }
        return res
    }

    scoreParse(tokens) {
        let tokenList = [], tokenItem = []
        tokens.forEach(item => {
            switch (item.type) {
                case 'space':
                    tokenList.push(tokenItem)
                    tokenItem = []
                    break
                case 'spu':
                case 'pu':
                    tokenItem.push({type: item.type, text: item.string, by: [], qiang: []})
                    break
                case 'qiang':
                    // tokenItem.push({type: item.type, text: this.hashKey[item.string]})
                    for (let tail=tokenItem.length-1; tail >= 0; tail--) {
                        if (tokenItem[tail].type == 'pu') {
                            tokenItem[tail].qiang.push({type: item.type, text: this.hashKey[item.string]})
                            break
                        }
                    }
                    break
                case 'by':
                    for (let tail=tokenItem.length-1; tail >= 0; tail--) {
                        if (tokenItem[tail].type == 'pu') {
                            tokenItem[tail].by.push(item.string)
                            break
                        }
                    }
            }
        })
        if (tokenItem != []) tokenList.push(tokenItem)
        return tokenList
    }

}

export default GongParser

