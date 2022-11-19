<template>
<span class="cell" :class="lyric.type" v-if="lyric">
  <span class="pu" v-if="score">
    <span :class="item.type=='spu'?'spu-cell':'pu-cell'" v-for="item in score">
      <span class="pu-qiang">
        <span>{{item.text}}</span>
        <span v-if="item.qiang" class="qiang">
          <span v-for="qiang in item.qiang">{{qiang.text}}<br></span>
        </span>
      </span>
      <span v-if="item.by" class="by">
        <span v-for="by in item.by" :style="[ '1', '3', '4', '6', '8'].includes(by)?'color:red':''">{{by}}<br></span>
      </span>
      <br>
    </span>
  </span>
  <span class="diao" v-if="lyric.diao">{{lyric.diao}}</span>
  {{lyric.text}}
</span>
</template>

<script>
export default {
  props: {
    lyric: {
      type: Object,
      default: null
    },
    score: {
      type: Array,
      default: null
    }
  },
  name: "ScoreCell"
}
</script>

<style lang="scss" scoped>
.cell {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  vertical-align: bottom;
  width: 150px;
  font-weight: bolder;
}

.title {
  height: 100%;
  font-size: 40px;
  letter-spacing: 16px;
}

.pai {
  font-size: 30px;
  letter-spacing: 8px;
  line-height: 1.5;
}

.diao {
  font-size: 18px;
  letter-spacing: 6px;
}

.jia {
  font-size: 24px;
  line-height: 48px;
  letter-spacing: 6px;
}

.ci {
  font-size: 36px;
  height: 60px;
  padding-top: 12px;
  padding-bottom: 12px;
}

.pu {
  position: absolute;
  top: 10px;
  left: 30px;
  font-size: 16px;
  writing-mode: horizontal-tb;
  transform:  rotate(-40deg) scaleY(0.93);
  transform-origin: top right;
  line-height: 1;
 font-family: gongchepu !important;
  .pu-cell {
    display: flex;
  }
  .spu-cell {
    display: flex;
    font-size: .75em !important;
    padding-left: 4px;
  }
  .pu-qiang {
    display: flex;
    flex-direction: column;
  }
  .qiang {
    line-height: 9px;
    margin-top: -4px;
    margin-left: -2px;
    padding: 0;
  }
  .by {
    padding-top: 2px;
    padding-bottom: 4px;
    line-height: 6px;
  }
}

.nian {
  padding-top: 12px;
  line-height: 50px;
  letter-spacing: 2px;
  width: auto;
}

</style>
