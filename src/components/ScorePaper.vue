<template>
<div class="score-paper">
  <div class="paper-border">
    <span
        v-for="(line, index) in data"
        :key="line.uid"
        :class="activeLine==index?'activeLine':''"
    >
      <span class="page" v-show="isShowLine">{{index+1}}</span>
      <ScoreCell
          v-for="(item, ch) in line.lyric"
          :lyric="item" :score="line.score[ch]">
      </ScoreCell>
    </span>
  </div>
</div>
</template>

<script>
/**
 * 标题：title
 * 曲牌：pai
 * * * 调: diao
 * 唱词：ci
 * * * 唱谱：pu
 * 夹白：jia
 * 念白：nian
 */

import ScoreCell from "@/components/ScoreCell";
import {reactive, ref} from "vue";
import horwheel from '@/utils/horwheel'

export default {
  components: {ScoreCell},
  setup(args) {
    /**
     * 显示行号
     * @type {Ref<UnwrapRef<boolean>>}
     */
    let isShowLine = ref(false)
    const showLine = () => {
      isShowLine.value = !isShowLine.value
    }

    /**
     * 词更新
     * @type {UnwrapNestedRefs<*[]>}
     */
    let data = reactive([])
    let activeLine = ref(null)
    const updateLyricData = (start, len, operation, tokenList) => {
      activeLine.value = start
      // 一行操作
      if (data[start] == undefined) {
        data[start] = {uid: Math.random(), lyric: tokenList[0], scoreId: Math.random(), score: []}
      } else {
        data[start].lyric = tokenList[0]
      }
      // 多行修改
      if (len > 1) {
        if (operation == 'add') {
          for (let line = start+1, n = 1; line < start + len; line++) {
            data.splice(line, 0, {uid: Math.random(), lyric: tokenList[n++], scoreId: Math.random(), score: []})
          }
          activeLine.value = start + len - 1
        } else {
          data.splice(start+1, len-1)
        }
      }
    }


    /**
     * 更新曲
     * @type {UnwrapNestedRefs<*[]>}
     */
    let scoreData = []
    const updateScoreData = (start, len, operation, tokenList) => {
      activeLine.value = start
      // 一行操作
      const scoreId = Math.random()
      scoreData[start] = {scoreId: scoreId, score: tokenList[0]}
      if (data[start] != undefined) {
        data[start].scoreId = scoreId
        data[start].score = tokenList[0]
      }
      // 多行修改
      if (len > 1) {
        if (operation == 'add') {
          for (let line = start+1, n = 1; line < start + len; line++) {
            scoreData[line] = {scoreId: Math.random(), score: tokenList[n]}
            if (data[line] != undefined) {
              data[line].scoreId = scoreId
              data[line].score = tokenList[n++]
            }
            // scoreData.splice(line, 0, {uid: Math.random(), token: tokenList[n++]})
          }
          activeLine.value = start + len - 1
        } else {
          scoreData.splice(start+1, len-1)
          for (let line = start+1, n = 1; line < start + len; line++) {
            if (data[line] != undefined) {
              data[line].scoreId = Math.random()
              data[line].score = []
            }
            // scoreData.splice(line, 0, {uid: Math.random(), token: tokenList[n++]})
          }
        }
      }
    }

    /**
     * 刷新
     */
    const fresh = () => {
      for (let i=0; i<data.length; i++) {
        if (scoreData[i] != undefined) {
          if (data[i].scoreId != scoreData[i].scoreId) {
            data[i].score = scoreData[i].score
          }
        } else {
          data[i].scoreId = Math.random()
          data[i].score = []
        }
      }
    }

    const autoScroll = (e) => {
      const paper = document.querySelector('.paper-border')
      const left = e * paper.scrollWidth
      paper.scrollLeft = -left
    }



    return {
      showLine,
      isShowLine,
      data,
      activeLine,
      updateLyricData,
      updateScoreData,
      fresh,
      autoScroll
    }
  },

  mounted() {
    // 纵向滚动
    const paper = document.querySelector('.paper-border')
    horwheel(paper)

    const autoScroll = (e) => {
      // const paper = document.querySelector('.paper-border')
      const left = e * paper.scrollWidth
    }
  },

  name: "ScorePaper"
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";
.activeLine {
  color: #FF0000 !important;
}
.score-paper {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: $paper-bg-color;
  padding: 5px 20px 20px;
}

.paper-border {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  padding-left: 20vw;
  border: $paper-border-color double 6px;
  outline: $paper-border-color solid 3px;
  writing-mode: vertical-rl;
  text-align: left;
  overflow-x: auto;
  overflow-y: hidden;
}

.page {
  left: 0;
  writing-mode: horizontal-tb;
  color: red;
}
</style>
