<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h6 class="login_logo" style="font-size: 20px;">山东市政设施养护管理</h6>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on: !loginWay}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="50" placeholder="设备码" v-model="code" disabled>
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import {mapState} from 'vuex'
import {reqLogin} from '../../api'
export default {
  data () {
    return {
      loginWay: false
    }
  },
  activated () {
    this.sm()
  },
  mounted () {
    this.sm()
  },
  computed: {
    ...mapState(['code'])
  },
  methods: {
    async login () {
      // let wt = plus.nativeUI.showWaiting('正在登陆中')
      let {code} = this
      let result = await reqLogin(code)
      console.log(result)
      if (result.state === 'ok') {
        // plus.nativeUI.toast('登陆成功')
        // wt.close()
        const id = result.msg.userid
        const type = result.msg.usertype
        const branch_id = result.msg.branch_id
        const user = result.msg.user
        const parentId = result.msg.parentId
        this.$store.dispatch('getId', id)
        this.$store.dispatch('getBranch', branch_id)
        this.$store.dispatch('getType', type)
        this.$store.dispatch('getUser', user)
        this.$store.dispatch('getParent', parentId)
        this.$router.replace('/base')
      }
    },
    sm () {
      let This = this
      document.addEventListener('plusready',function () {
        // 在这里调用plus api
        let code = plus.device.imei.split(',')[0]
        This.$store.dispatch('getCode', code)
      },false)


    }
  }
}
</script>

<style scoped>
  .loginContainer {
    width: 100%;
    height: 100%;
    background: #fff;
  }
  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;
  }
  .login_header .login_logo {
    font-size: 40px;
    font-weight: bold;
    color: #02a774;
    text-align: center;
  }
  .login_content .login_message {
    position: relative;
    margin-top: 16px;
    height: 48px;
    font-size: 14px;
    background: #fff;
  }
  .login_content input {
    width: 100%;
    height: 100%;
    text-align: center;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: 0;
    font: 400 14px Arial;
  }
  .login_content input:focus {
    border: 1px solid #02a774
  }
  .login_submit {
    display: block;
    position: absolute;
    width: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 42px;
    margin-top: 30px;
    border-radius: 4px;
    background: #4cd96f;
    color: #fff;
    text-align: center;
    font-size: 16px;
    line-height: 42px;
    border: 0;
  }
</style>
