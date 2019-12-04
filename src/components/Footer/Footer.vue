<template>
  <div class="footer_guide border1">
    <slot name="left"></slot>
    <slot name="center"></slot>
    <slot name="right"></slot>
  </div>
</template>

<script>
export default {
  methods: {
    goTo (path) {
      this.$router.push(path)
    }
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
  .footer_guide {
    position: fixed;
    z-index: 100;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    width: 100%;
    height: 40px;
    display: flex;
  }
  .guide_item {
    display: flex;
    flex: 1;
    text-align: center;
    flex-direction: column;
    align-items: center;
    line-height:40px;
    margin: 0px;
    color: #999999;
    background-color: rgb(143,211,234);
  }
  .guide_item:first-child {
    border-right: 1px solid rgb(147,174,183);
  }
  .guide_item:last-child {
    border-left: 1px solid rgb(147,174,183);
  }
  span {
    font-size: 14px;
    margin-top: 2px;
    margin-bottom: 2px;
    font-weight: bold;
    color: #000;
    cursor: pointer;
  }
  .iconfont {
    font-size: 22px
  }
</style>
