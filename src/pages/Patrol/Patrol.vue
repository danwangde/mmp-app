<template>
  <section class="content">
    <HeaderTop :title="title" />
    <div class="login_content">
      <form action="">
        <section>
          <section class="login_message">
            <select v-model="plan" title="" >
              <option value="" hidden>所属任务</option>
              <option v-for="(x, index) in plan_info" :key="index" :value="x.id" >{{x.plan_name}}</option>
            </select>
            <span style="color:red;position: absolute;top:20px;right:-10px;">*</span>
            <!-- <label class="disease-label">病害名称:</label>-->
          </section>
          <section class="login_message">
            <select v-model="facilities_type" title="" >
              <option value="">设施类型</option>
              <option v-for="(x, index) in facility" :key="index" :value="x.value" >{{x.name}}</option>
            </select>
            <span style="color:red;position: absolute;top:20px;right:-10px;">*</span>
            <!-- <label class="disease-label">病害名称:</label>-->
          </section>
          <section class="login_message">
            <select v-model="BridgeName" title="" >
              <option value="">设施名称</option>
              <option v-for="(x, index) in bridge" :key="index" :value="x.BridgeID" >{{x.BridgeName}}</option>
            </select>
            <span style="color:red;position: absolute;top:20px;right:-10px;">*</span>
            <!-- <label class="disease-label">病害名称:</label>-->
          </section>
          <section class="login_message">
            <!--<label class="disease-label">设施名称:</label>-->
            <input type="text" placeholder="巡查时间" id="orderTime" v-model="Inspection_date">
          </section>
          <section class="login_message">
            <!--<label class="disease-label">设施名称:</label>-->
            <input type="text" maxlength="50" placeholder="巡查员" v-model="Inspecting_Officer" >
          </section>
          <button class="disease_submit" @click.prevent="report">确认</button>
        </section>
      </form>
    </div>
  </section>
</template>
<script>
import {reqPlan, reqCuring} from '../../api'
import {mapState} from 'vuex'
import HeaderTop from '../../components/Header/Header.vue'
import Time from '../../components/Time/Time.vue'
export default {
  data () {
    return {
      title: '新建巡查计划',
      plan: '',
      BridgeName: '',
      facilities_type: '',
      Inspection_date: '',
      Inspecting_Officer: '',
      plan_info: [],
      facility: [
        {
          value: '0',
          name: '桥梁'
        },
        {
          value: '1',
          name: '人行通道'
        }
      ],
      Bearing: ['','','','',''],
      Bridge_brand: ['','','','',''],
      Bridge_connection: ['','','','',''],
      Drainage_facilities: ['','','','',''],
      Limit_height_load: ['','','','',''],
      Railing: ['','','','',''],
      Roadway: ['','','','',''],
      Sidewalk: ['','','','',''],
      Substructure: ['','','','',''],
      Superstructure: ['','','','',''],
      expansion_joint: ['','','','',''],
      Whether_construction: '',
      other_disease: '',
      weather: '',
      A_Signin_date: '',
      B_Signin_date: '',
      task_id: '',
      Other: '',
      Reporting_time: ''
    }
  },
  computed: {
    ...mapState(['branch_id', 'bridge'])
  },
  mounted () {
    // 使用：执行一个laydate实例
    laydate.render({
      elem: '#orderTime', // 指定元素
      type: 'datetime', // 组件的类型：year,month,time···
      format: 'yyyy-MM-dd HH:mm', //  设置显示格式
      done: value => { // 点击确认执行的回调函数，会把当前选择的时间传入进来
        // 把选择的时间赋值给先前定义好的变量，显示在页面
        this.Inspection_date = value
      }
    })
    this.getPlan()
  },
  methods: {
    async report () {
      let {BridgeName, A_Signin_date, B_Signin_date, branch_id, Inspecting_Officer, Bridge_brand, Limit_height_load,  Roadway, Sidewalk, expansion_joint, Railing, Drainage_facilities, Bridge_connection, Superstructure, Bearing, Substructure, Whether_construction, other_disease, Inspection_date, weather, plan, Other, Reporting_time, facilities_type} = this
      console.log(this)
      let result = await reqCuring(BridgeName, A_Signin_date, B_Signin_date, branch_id, Inspecting_Officer, Bridge_brand, Limit_height_load,  Roadway, Sidewalk, expansion_joint, Railing, Drainage_facilities, Bridge_connection, Superstructure, Bearing, Substructure, Whether_construction, other_disease, Inspection_date, weather, plan, Other, Reporting_time, facilities_type)
      console.log(result)
      if (result === '1') {
        plus.nativeUI.toast('新增巡查成功')
      }
      this.$router.push('/base')
    },
    async getPlan () {
      this.plan_info = await reqPlan(this.branch_id)
    }
  },
  components: {
    HeaderTop,
    Time
  }
}
</script>

<style scoped>
  .content {
    width: 100%;
    height: 100%;
    background: #fff;

  }
  .login_content {
    width:80%;
    padding-top: 40px;
    margin: 0 auto;
  }
  .login_content .login_message:first-child {
    margin-top: 12px;
  }
  .login_content .login_message {
    position: relative;
    margin-top: 8px;
    height: 40px;
    font-size: 14px;
    background: #fff;
  }
  .disease-label {
    margin-left: 8px;
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
</style>
