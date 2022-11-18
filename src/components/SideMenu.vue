<template>
<div class="container"
     :style="direction=='right'?'flex-direction: row-reverse':'row'">
  <div class="panel"
       v-drag-resize:[direction]="{max:limitMax,min:limitMin}"
       ref="panelContainer"
       :style="panelShow?'width:'+initWidth:''"
  >
    <div class="panel-top">
      <div class="slot-item" v-for="item in menuTop" v-show="item.active" :style="'max-height:'+topMaxHeight+'%'">
        <slot :name="item.name"></slot>
      </div>
    </div>
    <div class="panel-bottom" ref="panelBottom" v-drag-resize:top>
      <div v-for="item in menuBottom" v-show="item.active">
        <slot :name="item.name"></slot>
      </div>
    </div>
  </div>
  <div class="menu">
    <div class="menu-top">
      <div>
        <ul class="menu-ul">
          <li
              v-for="item in menuTop"
              class="menu-li"
              :class="item.active?'active':''"
              @click="toggleTop(item.id)"
          >{{item.title}}</li>
        </ul>
      </div>
      <div>
        <ul class="menu-ul">
          <li
              class="menu-li"
              v-for="item in menuClick"
              @click="$emit('btnClick', item.id)"
          >{{ item.title }}</li>
        </ul>
      </div>
    </div>
    <div>
      <ul class="menu-ul">
        <li
            v-for="item in menuBottom"
            class="menu-li"
            :class="item.active?'active':''"
            @click="toggleBottom(item.id)"
        >{{item.title}}</li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import {computed, reactive, ref, watch, watchEffect} from 'vue'

export default {
  props: {
    menu: {
      type: Object,
      default: {
        top: [
          {
            title: '写词',
            name: 'lyric',
            active: true,
            id: 0
          },
          {
            title: '写曲',
            name: 'score',
            active: true,
            id: 1
          }
        ],
        click: [
          {
            title: '刷新',
            id: 0,
          }
        ],
        bottom: [
          {
            title: '帮助',
            name: 'help',
            active: false,
            id: 0
          },
          {
            title: '关于',
            name: 'about',
            active: false,
            id: 1
          }
        ]
      }
    },
    direction: {
      type: String,
      default: 'right'
    },
    limitMax: {
      type: Object,
      default: null
    },
    limitMin: {
      type: Object,
      default: null
    },
    initWidth: {
      type: String,
      default: '40vw'
    }
  },
  setup(args, context) {
    let panelBottom = ref(null)
    let panelContainer = ref(null)
    let menuTop = reactive(args.menu.top)
    let menuBottom = reactive(args.menu.bottom)
    let menuClick = reactive(args.menu.click)

    // 顶部按钮控制
    const toggleTop = (id) => {
      menuTop[id].active = !menuTop[id].active
    }

    // 底部按钮控制
    const toggleBottom = (id) => {
      for (let i=0; i<menuBottom.length; i++)
        if (i != id) menuBottom[i].active = false
      menuBottom[id].active = !menuBottom[id].active
    }

    // 计算属性，判断是否存在激活栏
    let bottomShow = computed(() => menuBottom.some(item => item.active))
    const panelShow = computed(() => (menuTop.some(item => item.active) || menuBottom.some(item => item.active)))
    const topMaxHeight = computed(() => {
      const activeNumber = menuTop.reduce((pre, curr) => {
        if (curr.active) pre++
        return pre
      }, 0)
      return  1.0 / parseFloat(activeNumber) * 100
    })

    // 监听是否菜单显示
    watch(bottomShow, (newValue) => {
      const height = newValue? '': '0px'
      panelBottom.value.style.height = height
    })
    watch(panelShow, (newValue) => {
      const width = newValue? args.initWidth: '0px'
      panelContainer.value.style.width = width
    })

    return {
      menuClick,
      menuTop,
      menuBottom,
      toggleTop,
      toggleBottom,
      panelBottom,
      panelContainer,
      panelShow,
      topMaxHeight
    }
  },
  name: "sideMenu"
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";

.active {
  background: $btn-active-color !important;
}

.container {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  height: 100%;
  width: 100%;
}

.panel {
  position: relative;
  width: 100%;
  background-color: $background-color;
  max-width: 50vw;
  .panel-top {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background-color: $background-color;
    .slot-item {
      display: flex;
      flex: 1;
    }
  }
  .panel-bottom {
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: $paper-bg-color;
    max-height: 100%;
    border-top: 1px solid $paper-border-color;
  }
}

.menu {
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: $menu-width;
  background: $menu-bg-color;
  box-shadow: $menu-shadow-color 0 0 1px;
  writing-mode: vertical-rl;
  z-index: 999;
  .menu-top {
    display: flex;
    flex-direction: row;
  }
  .menu-ul {
    display: flex;
    flex-direction: row;
    width: 100%;
    .menu-li {
      display: inline-block;
      line-height: $menu-width;
      padding-top: 10px;
      padding-bottom: 10px;
      font-size: $menu-font-size;
      color: $menu-font-color;
      letter-spacing: 6px;
      &:hover {
        background: $btn-hover-color;
        box-shadow: $menu-shadow-color 0 0 1px;
        cursor: default;
      }
    }
  }
}

</style>
