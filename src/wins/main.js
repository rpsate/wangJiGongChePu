import { app, BrowserWindow, ipcMain, dialog } from "electron"
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import { deepAssign } from "@/utils/comm.func";
const fs = require('fs')

const events = require('events')

const winConfig = {
    show: false,
    frame: false,
    focusable: true,
    resizable: true,
    webPreferences: {
        nodeIntegration: false,
        contextIsolation: true
    }
}

class Mainwin extends events {
    constructor(config) {
        super()
        this.config = deepAssign(config, winConfig)
        this.windowInstance = new BrowserWindow(this.config)
        if (process.env.WEBPACK_DEV_SERVER_URL) {
            this.windowInstance.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '#/')
        } else {
            createProtocol('app')
            this.windowInstance.loadURL('app://./index.html/#/')
        }
        this.init()
        this.listener()
    }

    init() {
        this.windowInstance.once('ready-to-show', () => {
            this.windowInstance.show()
        })
        this.windowInstance.on('show', () => {
            this.emit('show')
        })
    }

    close() {
        if (this.windowInstance && this.windowInstance.isVisible) {
            this.windowInstance.close()
            this.windowInstance = null
        }
    }

    listener() {
        ipcMain.on('win:max', () => {
            if (this.windowInstance.isMaximized()) {
                this.windowInstance.unmaximize()
            } else {
                this.windowInstance.maximize()}
        })
        ipcMain.on('win:min', () => {this.windowInstance.minimize()})
        ipcMain.on('win:close', () => {app.quit()})

        // 保存文件
        ipcMain.on('file:save', (event, args) => {this.saveFile(args)})
        ipcMain.on('file:open', async (event) => {
            const res = await this.openFile()
            event.reply('file:loaded', res)
        })
        ipcMain.on('file:export', (event, args) => {this.exportFile(args)})
    }

    /**
     * save file
     * @param args
     */
    saveFile (args) {
        const res = dialog.showSaveDialogSync({
            title: '保存文件',
            buttonLabel: '保存',
            filters: [
                {
                    name: '', extensions: ['gcp']
                }
            ]
        })
        if (res) fs.writeFileSync(res, args)
    }

    /**
     * export
     * @param text
     */
    exportFile (text) {
        const res = dialog.showSaveDialogSync({
            title: '导出为web平台格式',
            buttonLabel: '保存',
            filters: [
                {
                    // 只读取js文件
                    name: '', extensions: ['txt']
                }
            ]
        })
        if (res) fs.writeFileSync(res, text)
    }

    /**
     * openFile
     */
    openFile () {
        const res = dialog.showOpenDialogSync({
            title: '读取文件',
            buttonLabel: '读取',
            filters: [
                {
                    // 只读取js文件
                    name: 'Custom File Type', extensions: ['gcp']
                }
            ]
        })

        if (res == undefined) return undefined

        try {
            const lyricScore = fs.readFileSync(res[0]).toString()
            return {
                status: true,
                data: JSON.parse(lyricScore)
            }
        } catch (e) {
            return {status: false, data: null}
        }
    }
}

export default Mainwin
