<template>
<div class="help">
  <h2>引言</h2>
  <p>为了实现高效快速打谱，我实现了一种词谱分离的输入方案，解决了当前工尺谱平台打谱过程频繁切换输入法和频繁点击鼠标等问题，大大提高了打谱效率。同时借鉴了Markdown编辑器”所见即所得“的思想，输入的同时可以见到排版后的工尺谱输出。</p>
  <h2>输入格式</h2>
  <p style="text-indent: 0">
    1.以 # 开头表示标题。<br>
    2.以 > 开头或者写在括号内表示夹白。<br>
    3.以 = 开头表示念白。<br>
    4.以 // 开头表示注释。<br>
    5.唱词直接输入即可。
  </p>
  <h2>输入模式</h2>
  <p>
    忘机工尺谱设置了两种输入方式，分别为拼音输入模式和数字输入模式，用户可以在菜单栏选择熟自己悉的输入方式。注意：词与谱每行要一一对应，每个词与一段谱对应，每段谱通过空格分开。
    <span style="color: red">强烈建议：先输入词，后输入唱名，最后输入板眼（唱名全部输入完成后通过上下左右键将光标移动到对应位置后输入板眼）。</span>
  </p>
  <h4>拼音输入模式</h4>
  <p>在拼音输入模式下只要输入工尺谱的首字母即可输入对应的字，在按住Shift键同时输入谱可以降八度，按住Ctrl键或者Alt键同时输入可以升八度。由于字体的原因，现在支持的音域是[a-q]，按键表如下所示：</p>
  <img src="../assets/images/pinYing.png">
  <h4>数字输入模式</h4>
  <p>在数字输入模式下工尺谱表示与简谱表示对应，在按住Shift键同时输入谱可以降八度，按住Ctrl键或者Alt键的同时输入可以升八度。由于字体的原因，现在支持的音域是[a-q]，按键表如下所示：</p>
  <img src="../assets/images/pinYing.png">
  <h2>刷新</h2>
  <p>如果用户在编辑框的中间输入词或谱，那么词和谱原本一一对齐的关系将会被打乱，用户只需要点击右边菜单栏上的刷新按钮即可重新将词与谱对齐。</p>
  <h2>保存与打开</h2>
  <p>为了方便工尺谱的传播，该工具可以通过菜单栏上的按钮将曲谱保存，保存文件后缀名为.gcp，保存后可以将曲谱文件分享给曲友，同时也可以通过该软件菜单栏上打开按钮可以打开工尺谱文件。</p>
  <h2>导出</h2>
  <p>为了促进工尺谱数字化，忘机工尺谱输入的曲谱可以通过菜单栏上的导出按钮将工尺谱导出为工尺谱数字化平台（https://gongchepu.net）支持的格式。</p>
</div>
</template>

<script>
export default {
  name: "Help"
}
</script>

<style lang="scss" scoped>
.help {
  padding: 22px;
  text-align: left;
  height: 100%;
  overflow: auto;
  font-family: 'Segoe UI', Arial, Helvetica, 'Microsoft Jhenghei', 'Hiragino Sans GB', 'WenQuanYi Zen Hei', 'Microsoft Yahei', STHeiti, SimSong, 'WenQuanYi Micro Hei', sans-serif;
  p {
    padding-top: 6px;
    padding-bottom: 12px;
    text-indent: 32px;
    line-height: 1.5;
  }
  img {
    width: 100%;
    padding-bottom: 12px;
  }
}

</style>
