<template>
<div id="app" class="page-wrapper">
  <div class="container">
    <div class="header">
      <Header @topMenuClick="topMenuClick" @topMenuSubClick="topMenuSubClick" :menu="menuData"></Header>
    </div>
    <div class="main">
      <div class="paper">
        <ScorePaper ref="scorePaper"></ScorePaper>
      </div>
      <div class="type" id="type">
        <SideMenu id="right-menu" direction="left" :limit-min="{width:200}" @btnClick="btnClick" ref="sideMenu">
          <!--top menu-->
          <template #lyric>
            <div class="lyric">
              <!-- 词 -->
              <Codemirror
                  class="editor"
                  ref="lyricVueInstant"
                  v-model:value="lyric"
                  :options="lyricOptions"
                  @changes="lyricInput"
                  @ready="lyricReady"
                  @beforeChange="lyricBeforeChange"
              />
            </div>
          </template>

          <template #score>
            <div class="score">
              <!-- 曲 -->
              <Codemirror
                  ref="scoreVueInstant"
                  class="editor"
                  v-model:value="score"
                  :options="scoreOptions"
                  @changes="scoreInput"
                  @beforeChange="scoreBeforeChange"
                  @ready="scoreReady"
              />
            </div>
          </template>

          <!-- bottom menu -->
          <template #help>
            <Help></Help>
          </template>
          <template #about>
            <About></About>
          </template>
        </SideMenu>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import SideMenu from "@/components/SideMenu";
import ScorePaper from "@/components/ScorePaper";
import {ref} from "vue";
import Codemirror from "codemirror-editor-vue3";
import './lib/gongLyricMode.js'
import "./lib/gongScoreMode.js";
import './assets/theme/lyric-editor.css'
import './assets/theme/score-editor.css'
import GongParser from "@/lib/GongParser";
import './config/config.js'
import {numberType, pinYingType} from "@/config/config";
import Header from "@/components/Header";
import GongExport from "@/lib/gongExport";
import Help from "@/components/Help";
import About from "@/components/About";


export default {
  setup() {
    // init
    const gongParser = new GongParser()
    const gongExport = new GongExport()
    const scorePaper = ref(null)
    const sideMenu = ref(null)
    const menuData = [
      {title: '打开', id: 0},
      {title: '保存', id: 1},
      {title: '导出', id: 2},
      {title: '显示行数', id: 3},
      {
        title: '输入模式',
        id: 4,
        subMenu: [
          {title: '数字模式', id: 0, active: true},
          {title: '拼音模式', id: 1, active: false}
        ]
      },
      {title: '帮助', id: 5},
      {title: '关于', id: 6}
    ]

    // 词编辑器 配置
    let lyric = ref('');
    const lyricOptions = {
      mode: "gonglyric",
      theme: "lyric-editor",
      lineWrapping: true
    }
    // 曲编辑器 配置
    let score = ref('');
    const scoreOptions = {
      mode: "gongscore",
      theme: "score-editor",
      lineWrapping: true,
      extraKeys: numberType
    }




    /**
     * 词输入框更新调用方法
     * @param cmInstance
     * @param changeObj
     */
    const lyricInput = (cmInstance, changeObj) => {
      changeObj.forEach(item => {
        // 获取更改内容的数
        let start = item.from.line
        const len = Math.max(item.text.length, item.removed.length)
        // 判断是添加还是删除
        const operation = item.text.length > item.removed.length? 'add': 'remove'
        // 获取token序列
        let tokenList = []
        for(let line = start; line < start + len; line++) {
          let tokens = cmInstance.getLineTokens(line, true)
          tokenList.push(gongParser.lyricParse(tokens))
        }
        // 自动滚动
        const lineCount = cmInstance.lineCount()
        const left = (start + len) / lineCount
        scorePaper.value.autoScroll(left)
        // 更新
        scorePaper.value.updateLyricData(start, len, operation, tokenList)
      })
    }



    /**
     * 获取scoreEditor实例
     * @type {null}
     */
    const scoreEditor = ref(null)
    const scoreReady = (cmInstant) => {
      // 板眼顺序
      scoreEditor.value = cmInstant
      window.banyan = ['1', '2', '3', '4']
      window.banyanIndex = 0

      // 输入模式
      const subId = localStorage.getItem('inputType')
      if (subId == 0) {
        scoreEditor.value.setOption('extraKeys', numberType)
      } else {
        scoreEditor.value.setOption('extraKeys', pinYingType)
      }
    }

    /**
     * 获取lyricEditor实例
     * @type {null}
     */
    const lyricEditor = ref(null)
    const lyricReady = (cmInstant) => {
      lyricEditor.value = cmInstant
    }

    const lyricBeforeChange = (cmInstant, changeObj) => {
      const selection = lyricEditor.value.getSelection()
      if (selection && changeObj.origin == "paste") {
        changeObj.cancel()
      }
    }

    const scoreBeforeChange = (cmInstance, changeObj) => {
      const selection = scoreEditor.value.getSelection()
      if (selection && changeObj.origin == "paste") {
        changeObj.cancel()
      }


      /**
       * 按空格自动换行
       */
      /*let lyricCount = 0
      const lyricToken = lyricEditor.value.getLineTokens(changeObj.from.line, true)
      lyricToken.forEach(item => {
        if (item.type == 'ci') {
          lyricCount += item.string.length
        }
      })
      const scoreText = cmInstance.getLine(changeObj.from.line)
      const scoreCount = scoreText.split(' ').length

      const text = changeObj.text[0]
      if (text == ' ' && scoreCount >= lyricCount) {
      }*/
    }

    const scoreInput = (cmInstance, changeObj) => {
      const lineCount = lyricEditor.value.lineCount()
      changeObj.forEach(item => {
        // 获取更改内容的数
        let start = item.from.line
        const len = Math.max(item.text.length, item.removed.length)
        // 判断是添加还是删除
        const operation = item.text.length > item.removed.length? 'add': 'remove'
        // 获取token序列
        let tokenList = []
        for(let line = start; line < start + len; line++) {
          let tokens = cmInstance.getLineTokens(line, true)
          tokenList.push(gongParser.scoreParse(tokens))
        }
        // // 自动滚动
        // const lineCount = lyricEditor.value.lineCount()
        // const left = (start + len - 1) / lineCount
        // scorePaper.value.autoScroll(left)
        // 更新
        scorePaper.value.updateScoreData(start, len, operation, tokenList)
      })
    }

    const btnClick = (id) => {
      switch (id) {
        case 0:// 刷新
          scorePaper.value.fresh()
          break
        case 1:
          const scrollInfo = lyricEditor.value.getScrollInfo()
          const left = scrollInfo.top / Math.max((scrollInfo.height - scrollInfo.clientHeight), 1)
          scorePaper.value.autoScroll(left)
          break
      }
    }


    /**
     * 获取导出的字符串
     * @returns {string}
     */
    const getExportText = () => {
      // 词
      let lyricTokens = []
      const lyricLen = lyricEditor.value.lineCount()
      for (let i=0; i<lyricLen; i++) {
        const tokens = lyricEditor.value.getLineTokens(i, true)
        let tokensLine = []
        tokens.forEach(token => {
          if (token.type == 'ci') {
            for (let j=0;j<token.string.length;j++) {
              tokensLine.push({type: token.type, text: token.string[j]})
            }
          } else if (token.type) tokensLine.push({type: token.type, text: token.string})
        })
        lyricTokens.push(tokensLine)
      }
      // 曲
      let scoreTokens = []
      const scoreLen = scoreEditor.value.lineCount()
      for (let i=0; i<scoreLen; i++) {
        const tokens = scoreEditor.value.getLineTokens(i, true)
        let tokensLine = []
        let scoreItem = []
        tokens.forEach(token => {
          if (token.type == 'space') {
            tokensLine.push(scoreItem)
            scoreItem = []
          } else {
            scoreItem.push({type: token.type, text: token.string})
          }
        })
        if (scoreItem) tokensLine.push(scoreItem)
        scoreTokens.push(tokensLine)
      }

      // 导出
      return gongExport.translate(lyricTokens, scoreTokens)
    }

    /**
     * 主菜单
     * @param id
     */
    const lyricVueInstant = ref(null)
    const scoreVueInstant = ref(null)
    const topMenuClick =  async (id) => {
      switch (id) {
        case 0:
          const res = await window.api.openFile()
          if (res == undefined) break
          if (res.status) {
            lyric.value = res.data.lyric
            score.value = res.data.score
          } else {
            alert('格式错误！')
          }
          break
        case 1:
          const data = {
            lyric: lyric.value,
            score: score.value
          }
          window.api.saveFile(JSON.stringify(data))
          break
        case 2:
          const text = getExportText()
          window.api.exportFile(text)
          break
        case 3:
          scorePaper.value.showLine()
          break
        case 4:
          // 输入模式，只处理子菜单
          break
        case 5:
          sideMenu.value.toggleBottom(0)
          break
        case 6:
          sideMenu.value.toggleBottom(1)
          break
      }
    }

    const topMenuSubClick = (id) => {
      switch (id) {
        case 0: // 数字模式
          scoreEditor.value.setOption('extraKeys', numberType)
          break
        case 1: // 拼音模式
          scoreEditor.value.setOption('extraKeys', pinYingType)
          break
      }
    }

    return {
      Codemirror,
      ref,
      btnClick,
      // 词
      lyric,
      lyricOptions,
      lyricEditor,
      lyricInput,
      lyricReady,
      lyricBeforeChange,
      // 曲
      score,
      scoreOptions,
      scoreEditor,
      scoreInput,
      scoreBeforeChange,
      scoreReady,

      scorePaper,
      topMenuClick,
      topMenuSubClick,
      lyricVueInstant,
      scoreVueInstant,
      sideMenu,
      menuData
    };
  },
  components: {About, Help, ScorePaper, SideMenu, Codemirror, Header }
}

</script>

<style lang="scss">
@import "./assets/styles/comm";
@import "./assets/styles/variables";


#app {
  width:100%;
  height:100%;
  position:relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: monospace, kangxi;
}


.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.header {
  height: 30px;
  width: 100%;
}


.main {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  display: flex;
  height: calc(100% - 25px);
  width: 100%;
}

.paper {
  position: relative;
  flex: 1;
  flex-grow: 1;
  min-width: 50vw;
  overflow: auto;
}

.type {
  position: relative;
  height: 100%;
  box-shadow: $menu-shadow-color 0 0 1px;
  .lyric,
  .score {
    display: flex;
    flex: 1;
    flex-shrink: 0;
    max-width: 100%;
    font-size: 16px;
    text-align: left;
    overflow: auto;
  }
  .editor {
    border-radius: 0;
    flex: 1;
    font-size: 16px;
    letter-spacing: 2px;
    word-spacing: 0;
  }
}

</style>
