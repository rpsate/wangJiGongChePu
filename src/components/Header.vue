<template>
<div class="container">
  <div class="menu">
    <img src="../assets/images/header-logo.png">
    <div class="btn">菜单</div>
    <ul class="menu-ul">
      <li class="menu-li"
          @click="btnClick(item.id)"
          v-for="item in data">
        {{item.title}}
        <img v-if="item.subMenu" src="../assets/images/triangle-24.png">
        <ul class="sub-menu-ul" v-if="item.subMenu">
          <li class="sub-menu-li" v-for="subItem in item.subMenu" @click.stop="subBtnClick(item.id, subItem.id)">
            {{subItem.title}}
            <img v-show="subItem.active" class="radio-img" src="../assets/images/select.png">
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <div class="title">
    忘机工尺谱
  </div>

  <div class="control">
    <div @click="min"><img src="../assets/images/min.png"/></div>
    <div @click="max"><img src="../assets/images/max.png"/></div>
    <div @click="close"><img src="../assets/images/close.png"/></div>
  </div>
</div>
</template>

<script>
import {onMounted, reactive, ref} from "vue";


export default {
  name: "Header",
  props: {
    menu: {
      type: Array,
      default: []
    }
  },
  setup(props, context) {
    let data = reactive(props.menu)


    const min = () => {
      window.api.minWin()
    }
    const max = () => {
      window.api.maxWin()
    }
    const close = () => {
      window.api.closeWin()
    }
    const btnClick = (id) => {
      console.log('click')
      context.emit('topMenuClick', id)
    }
    const subBtnClick = (id, subId) => {
      // data[id].subMenu
      for (let i=0; i<data[id].subMenu.length; i++)
        data[id].subMenu[i].active = false
      data[id].subMenu[subId].active = true
      localStorage.setItem('inputType', subId)
      context.emit('topMenuSubClick', subId)
    }

    // 读取配置
    const id = 4
    const subId = localStorage.getItem('inputType')
    if (subId != undefined) {
      for (let i=0; i<data[id].subMenu.length; i++)
        data[id].subMenu[i].active = false
      data[id].subMenu[subId].active = true
    }

    return {
      min,
      max,
      close,
      btnClick,
      subBtnClick,
      data
    }
  }

}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";

.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  width: 100%;
  color: $menu-font-color;
  font-family: 'Segoe UI', Arial, Helvetica, 'Microsoft Jhenghei', 'Hiragino Sans GB', 'WenQuanYi Zen Hei', 'Microsoft Yahei', STHeiti, SimSong, 'WenQuanYi Micro Hei', sans-serif;
  font-size: 14px;
  background-color: $paper-bg-color;
  -webkit-app-region: drag;
}

.menu {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  -webkit-app-region: no-drag;
  img {
    width: 25px;
    height: 25px;
    margin-left: 12px;
  }
  &:hover .menu-ul {
    display: flex;
  }
  .btn {
    display: flex;
    align-items: center;
    height: 100%;
    padding-left: 4px;
    padding-right: 8px;
    cursor: pointer;

  }

  .menu-ul {
    display: none;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 28px;
    left: 16px;
    z-index: 999;
    background-color: $menu-bg-color;
    border: 1px solid $menu-border-color;
    box-shadow: $paper-border-color 3px 3px 6px;
    font-size: 14px;
    transition-delay: 500ms;
  }
  .menu-li,
  .sub-menu-li{
    position: relative;
    display: flex;
    padding-left: 20px;
    width: 120px;
    align-items: center;
    height: 25px;
    img {
      width: 18px;
      height: 18px;
    }
    .radio-img {
      width: 12px;
      height: 8px;
      padding-left: 6px;
    }
  }
  .menu-li:hover,
  .sub-menu-li:hover{
    background-color: $btn-active-color;
    cursor: pointer;
  }
  .menu-li:hover .sub-menu-ul {
    display: flex;
  }

  .sub-menu-ul {
    position: absolute;
    display: none;
    flex-direction: column;
    top: 0;
    left: 120px;
    z-index: 999;
    background-color: $menu-bg-color;
    border: 1px solid $menu-border-color;
    box-shadow: $paper-border-color 3px 3px 6px;
    font-size: 14px;
    transition-delay: 500ms;
  }
}

.control {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
  -webkit-app-region: no-drag;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 30px;
    &:hover {
      background-color: $btn-active-color;
    }
    img {
      width: 15px;
      height: 15px;
    }
  }
}

</style>
