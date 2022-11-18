const { ipcRenderer, contextBridge } = require('electron')
contextBridge.exposeInMainWorld('api', {
    minWin: () => ipcRenderer.send('win:min'),
    maxWin: () => ipcRenderer.send('win:max'),
    closeWin: () => ipcRenderer.send('win:close'),

    saveFile: (file) => ipcRenderer.send('file:save', file),
    openFile: async () => {
        return new Promise((resolve) => {
            ipcRenderer.send('file:open')
            ipcRenderer.on('file:loaded', (event, args) => {
                resolve(args)
            })
        })
    },
    exportFile: (data) => ipcRenderer.send('file:export', data)
})
