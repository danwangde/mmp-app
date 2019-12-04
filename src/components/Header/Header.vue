<template>
  <header class="header border1">
    <slot name="left"></slot>
    <span class="header_title">
      <span class="header_title_text ellipsis">{{title}}</span>
    </span>
    <slot name="right"></slot>
  </header>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

<style scoped>
  .border1:after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0px;
    height: 1px;
    content: '';
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    background-color: #f0f0f0;
  }
  .header {
    background-color: rgb(143,211,234);
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 45px;
  }
  .header_title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    color: #fff;
    text-align: center;
  }
  .header_title_text {
    font-size: 18px;
    color: #fff;
    display: block;
  }
</style>
