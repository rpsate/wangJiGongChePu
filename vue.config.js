const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      preload: "./src/preload.js",
      builderOptions: {
        productName: "忘机工尺谱",
        appId: "com.rpsate.wangJiGongChePu",
        asar: false,
        nsis: {
          "oneClick": false,
          "allowToChangeInstallationDirectory": true,
          "createDesktopShortcut": true,
          "createStartMenuShortcut": true,
          "shortcutName": "忘机工尺谱"
        },
        win: {
          "target": ["nsis","zip"],
          "icon": "./public/icons/icon.ico"
        },
        mac: {
          "target": ["dmg","zip"],
          "icon": "./public/icons/icon.icns"
        }
      }
    },
  },
})
