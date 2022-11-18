import { screen } from "electron";
import * as fs from "fs"
import * as path from "path";

const deepAssign = function (...param) {
    let result = Object.assign({}, ...param);
    for (let item of param) {
        for (let [idx, val] of Object.entries(item)) {
            if (typeof val === 'object') {
                result[idx] = deepAssign(result[idx], val);
            }
        }
    }
    return result;
}


// mkdir
const mkdir = function (pathUrl) {
    if (fs.existsSync(pathUrl)) return true
    return fs.mkdirSync(pathUrl, {recursive: true})
}

// ls
const ls = function (pathUrl) {
    if (!fs.existsSync(pathUrl)) return []
    else {
        const filesAndDirs = fs.readdirSync(pathUrl)
        return filesAndDirs.filter(item => {
            const fullPath = path.join(pathUrl, item)
            return fs.statSync(fullPath).isFile()
        })
    }
}

// save media
const saveMedia = function (blob, pathUrl) {
    return new Promise((resolve, reject) => {
        const times = new Date().getTime()

        if (mkdir(pathUrl)) {
            const localPath = path.join(pathUrl, `${times}.mp4`)
            const reader = new FileReader()
            reader.onload = () => {
                const buffer = Buffer.from(reader.result)
                fs.writeFile(localPath, buffer, {}, (err, res) => {
                    if (err) return console.error(err)
                })
            }
            reader.onerror = err => {
                reject(err)
            }
            reader.readAsArrayBuffer(blob)
            reader.onloadend = () => {
                resolve()
            }
        }
    })
}

export {
    deepAssign,
    mkdir,
    ls,
    saveMedia
}
