<template>
  <div class="alert_container">
    <section class="tip_text_container login_content">
      <section class="login_message">
        <label class="disease-label" style="width: 20%;">病害名称:</label>
        <span type="text" style="width: 70%;">{{disname}}</span>
      </section>
      <section class="login_message">
        <label class="disease-label" style="width: 20%;">病害数量:</label>
        <span type="text" style="width: 70%;">{{disnum}}</span>
      </section>
      <section class="login_message">
        <label class="disease-label" style="width: 20%;">所属结构:</label>
        <span type="text" style="width: 70%;">{{structure}}</span>
      </section>
      <section class="login_message">
        <label class="disease-label" style="width: 20%;">详细地址:</label>
        <span type="text" style="width: 70%;">{{disPosition}}</span>
      </section>
      <section class="login_message">
        <label class="disease-label" style="width: 20%;">其他描述:</label>
        <span type="text" style="width: 70%;"></span>
      </section>
      <section class="login_message">
        <label class="disease-label" style="width: 20%;">解决方法提示:</label>
        <span type="text" style="width: 70%;">{{Solution_Tips}}</span>
      </section>
      <section class="login_message" v-if="">
        <label class="disease-label" style="width: 20%;">图片:</label>
        <span type="text" style="width: 70%;">
          <img src="`http://192.168.1.162:9000/${imageDis}`" alt="">
        </span>
      </section>
      <div class="confrim" @click="closeTip">确认</div>
    </section>
  </div>
</template>

<script>
import {getImages} from  '../../api'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      photo_type: '1',
      images: ''
    }
  },
  props: {
    alertText: String,
    disname: String,
    disnum: String,
    structure: String,
    disPosition: String,
    Solution_Tips: String,
    image: String,
  },/*
  watch: {
    image (newValue, oldValue) {
      this.images = newValue
    }
  },*/
  mounted () {
    console.log(111)
   console.log(this.imageDis)
  },
  computed: {
    ...mapState(['baseinfo_id', 'imageDis'])
  },
  methods: {
    closeTip() {
      // 分发自定义事件(事件名: closeTip)
      this.$emit('closeTip')
    },
    async getImage () {
      let res = await getImages(this.baseinfo_id, this.photo_type, this.id)
      console.log(res[0])
    },
  }
}
</script>

<style  scoped>
  .content {
    width: 100%;
    height: 100%;
    background: #fff;

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
  .login_content {
    width:90%;
    padding-top: 40px;
    margin: 0 auto 50px auto;
  }
  .login_content .login_message {
    position: relative;
    left: 0px;
    margin-top: 8px;
    width: 50%;
    float: left;
    height: 20px;
    font-size: 14px;
    background: #fff;
  }
  .login_content input,select {
    width: 100%;
    height: 100%;
    padding-left: 10px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: 0;
    font: 400 14px Arial;
  }
  .login_content input:focus {
    border: 1px solid #02a774
  }
  .disease_submit {
    display: block;
    position: relative;
    width: 60%;
    margin: 10px auto;
    height: 42px;
    border-radius: 4px;
    background: #4cd96f;
    color: #fff;
    text-align: center;
    font-size: 16px;
    line-height: 42px;
    border: 0;
  }
  span {
    font-size: 14px;
    margin-top: 2px;
    margin-bottom: 2px;
    font-weight: bold;
    color: #000;
    cursor: pointer;
  }
  .alert_container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    background: rgba(0, 0, 0, .5)
  }

    .tip_text_container {
      position: absolute;
      top: 50%;
      left: 40%;
      margin-top: -120px;
      margin-left: -110px;
      width: 80%;
      animation: tipMove .4s;
      background-color: rgba(255, 255, 255, 1);
      border: 1px;
      padding-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-radius: 5px
    }

      .tip_icon {
        width: 55px;
        height: 55px;
        border: 2px solid #f8cb86;
        border-radius: 50%;
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
      .tip_icon span:nth-of-type(1) {
        width: 2px;
        height: 30px;
        background-color: #f8cb86;
      }
      .tip_icon span:nth-of-type(2) {
        width: 2px;
        height: 2px;
        border: 1px;
        border-radius: 50%;
        margin-top: 2px;
        background-color: #f8cb86;
      }
      .tip_text {
        font-size: 14px;
        color: #333;
        line-height: 20px;
        text-align: center;
        margin-top: 10px;
        padding: 0 5px;
      }

      .confrim {
        font-size: 18px;
        font-weight:  bold;
        margin-top:  10px;
        background-color: rgb(143,211,234);
        width:  100%;
        text-align:  center;
        line-height:  35px;
        border:  1px;
        color:  #fff;
        border-bottom-left-radius:  5px;
        border-bottom-right-radius:  5px;
      }

</style>
