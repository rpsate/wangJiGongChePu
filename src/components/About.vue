<template>
<div class="about">
  <h2>声明</h2>
  <p>
    忘记工尺谱软件开源免费，源码可以在作者github仓库中下载。软件所用都的字体和图片均来源于互联网，仅供于学习交流使用，严禁用于商业及非法途径，如有侵权请联系我删除。
  </p>
  <h2>联系方式</h2>
  <p>作者：刘正波</p>
  <p>博客：https://blog.csdn.net/rpsate</p>
  <p>b站：https://space.bilibili.com/352123052</p>
  <p>github：https://github.com/rpsate</p>
  <p>邮箱：rpsate@qq.com</p>
</div>
</template>

<script>
export default {
  name: "About"
}
</script>

<style lang="scss" scoped>
.about {
  padding: 22px;
  text-align: left;
  height: 100%;
  font-family: 'Segoe UI', Arial, Helvetica, 'Microsoft Jhenghei', 'Hiragino Sans GB', 'WenQuanYi Zen Hei', 'Microsoft Yahei', STHeiti, SimSong, 'WenQuanYi Micro Hei', sans-serif;
  p {
    padding-top: 6px;
    padding-bottom: 12px;
    text-indent: 32px;
    line-height: 1.5;
    word-break: break-all;
  }
  img {
    width: 100%;
    padding-bottom: 12px;
  }
}
</style>
