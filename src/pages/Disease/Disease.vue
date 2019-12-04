<template>
  <section class="content">
    <HeaderTop :title="title" />
    <div id="map" style="width: 100%; height:100px;display: none;"></div>
    <div class="login_content">
      <a style="display:inline-block;position: fixed;color:white;top: 16px;left:80%; z-index: 100" v-show="!status">{{time}}</a>
      <form action="">
        <section v-if="status" key="1">
          <section class="login_message_maintain">
            <input type="text" maxlength="50" placeholder="所属任务" v-model="plan" >
            <span style="color:red;position: absolute;top:20px;right:-10px;">*</span>
            <!-- <label class="disease-label">病害名称:</label>-->
          </section>
          <section class="login_message_maintain">
            <select v-model="facilities_type" title="" disabled>
              <option value="">设施类型</option>
              <option v-for="(x, index) in facility" :key="index" :value="x.value" >{{x.name}}</option>
            </select>
            <span style="color:red;position: absolute;top:20px;right:-10px;">*</span>
            <!-- <label class="disease-label">病害名称:</label>-->
          </section>
          <section class="login_message_maintain">
            <select v-model="BridgeName" title="" >
              <option value="">设施名称</option>
              <option v-for="(x, index) in selectBridge" :key="index" :value="x.id" >{{x.name}}</option>
            </select>
            <span style="color:red;position: absolute;top:20px;right:-10px;">*</span>
            <!-- <label class="disease-label">病害名称:</label>-->
          </section>
          <section class="login_message_maintain">
            <!--<label class="disease-label">设施名称:</label>-->
            <input type="text" placeholder="巡查时间" id="orderTime" v-model="Inspection_date">
          </section>
          <section class="login_message_maintain">
            <!--<label class="disease-label">设施名称:</label>-->
            <input type="text" maxlength="50" placeholder="巡查员" v-model="Inspecting_Officer" >
          </section>
          <button class="disease_submit" @click.prevent="reportCur" >确认</button>
        </section>
        <section v-else key="2" v-show="!isTrue">
          <section class="login_message" >
            <label class="disease-label" style="width: 20%;">设施名称:</label>
            <span type="text" maxlength="50" style="width: 70%;" >{{selectBridge[0].name}}</span>
          </section>
          <section class="login_message">
             <label class="disease-label" style="width: 20%;">病害名称:</label>
            <select v-model="diseaseName" title="" @change="metarial" style="width: 70%;">
              <option value="">病害名称</option>
              <option v-for="(x, index) in disease_info" :key="index" :value="x.id" >{{x.disease_name}}</option>
            </select>

          </section>
          <section class="login_message">
            <label class="disease-label" style="width: 20%;">所属结构:</label>
            <select v-model="structure" title=""  style="width: 70%;">
              <option value="">所属结构</option>
              <option v-for="(x, index) in structureArr" :key="index" :value="x.value" >{{x.name}}</option>
            </select>
          </section>
          <section class="login_message" >
            <label class="disease-label" style="width: 20%;">病害数量:</label>
            <input type="text" maxlength="50" placeholder="病害数量" v-model="reportNum" style="width: 65%;">
            <span>{{unit}}</span>
          </section>
          <section class="login_message" >
            <label class="disease-label" style="width: 20%;">详细地址:</label>
            <input type="text" maxlength="50" placeholder="详细地址" v-model="disPosition" style="width: 70%;">
          </section>
          <section class="login_message" v-show="!isTrue">
            <label class="disease-label" style="width: 20%;">其他描述:</label>
            <input type="text" maxlength="50" placeholder="其他描述" v-model="describe" style="width: 70%;" >
          </section>
          <Camera1 :photo_type="photo_type" style="position: absolute; left: 40px;"/>
          <Camera1 :photo_type="photo_type" style="position: absolute; left: 200px;" />
          <button class="disease_submit" @click.prevent="report" v-show="describe === ''" style="position: fixed; bottom: 50px; left: 70px;">病害上报</button>
          <button class="disease_submit" @click.prevent="hideOther" v-show="false">准备上报</button>
        </section>

      </form>
    </div>
    <Footer>
       <a class="guide_item"  slot="left" @click="submit"  style="text-decoration:none;">
        <span>结束巡查</span>
      </a>
      <a  class="guide_item"  slot="right" @click="goBack" style="text-decoration:none;">
        <span>返回首页</span>
      </a>
    </Footer>
    <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>
  </section>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
import {reqDisease, reqMaterial, reqCuring, reqPlan, reqMaintain, reqTrajectory, reqAddDis, reqDisReport, reqOddDis, reqPhoto, getMaxId} from '../../api'
import HeaderTop from '../../components/Header/Header.vue'
import Camera1 from '../../components/Camera1/Camera1.vue'
import Footer from '../../components/Footer/Footer.vue'
import AlertTip from '../../components/AlertTip/AlertTip.vue'
export default {
  data () {
    return {
      alertText: '',
      alertShow: false,
      isShow: true,
      isTrue: false,
      longitude: '',
      latitude: '',
      status: false,
      title: '日常巡查-病害上报',
      structure: '',
      structureArr: [
        {name: '车行道', value: '0'},
        {name: '人行道', value: '1'},
        {name: '结构', value: '2'},
        {name: '附属设施', value: '3'}
        ],
      diseaseName: '',
      metarials: [],
      metar: '',
      project_id: '',
      unit: '',
      Solution_Tips: '',
      reportNum: '',
      diseaseNum: '',
      address: '',
      describe: '',
      time: '00:00',
      int: '',
      disease_info: [],
      plan: '',
      BridgeName: '',
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
      Reporting_time: '',
      now: '',
      nowDate: '',
      disPosition: '',
      timer: null,
      photo_type: '0',
      bridge_id: '',
      state: '0'
    }
  },
  computed: {
    ...mapState(['selectBridge', 'photos', 'branch_id', 'bridge', 'userid', 'baseinfo_id','facilities_type','user', 'imageArr','parentId'])
  },
  async mounted () {
    console.log('测试')
    let This = this
    await this.start()
    this.timer = setInterval(async function () {
      await This.location()
      This.now = new Date()
      let {longitude, latitude, now, selectBridge, facilities_type} = This
      let trajectory = await reqTrajectory(longitude, latitude, now, selectBridge[0].id, facilities_type)
      console.log(trajectory)
    }, 10000)
    this.getGeo_status()
    this.location()
    this.disease()
    console.log(this.selectBridge)
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
    // console.log(this.photos)
  },
  methods: {
    upload () {
      let This = this
      let server = 'http://47.92.137.78:5000/curing/insert_photo'
      var wt = plus.nativeUI.showWaiting('照片正在上传中')
      var task = plus.uploader.createUpload(server,
        {method: 'POST'},
        function (t, status) { // 上传完成
          if (status === 200) {
            var data = JSON.parse(t.responseText)
            console.log(data.data)
            plus.nativeUI.toast('图片上传成功')
            console.log('图片上传成功')
            wt.close() // 关闭等待提示按钮
          } else {
            console.log('上传失败：' + status)
            wt.close()// 关闭等待提示按钮
          }
        }
      )
      // 添加其他参数
      task.addData('photo_type', This.photo_type)
      task.addData('baseinfo_id', This.baseinfo_id.toString())
      task.addData('project_id', This.project_id.toString())
      for (let [i,item] of This.imageArr.entries()){
        console.log('length')
        console.log(item)
        console.log(i)
        task.addFile(item, {key: 'file' + i})
      }
      task.start()
    },
    async reportCur () {
      this.Inspection_date = this.get_date_str(new Date())
      let {selectBridge, A_Signin_date, B_Signin_date, branch_id, user, Bridge_brand, Limit_height_load,  Roadway, Sidewalk, expansion_joint, Railing, Drainage_facilities, Bridge_connection, Superstructure, Bearing, Substructure, Whether_construction, other_disease, Inspection_date, weather, plan, Other, Reporting_time, facilities_type} = this
      console.log(this)
      let result = await reqCuring(selectBridge[0].id, A_Signin_date, B_Signin_date, branch_id, user, Bridge_brand, Limit_height_load,  Roadway, Sidewalk, expansion_joint, Railing, Drainage_facilities, Bridge_connection, Superstructure, Bearing, Substructure, Whether_construction, other_disease, Inspection_date, weather, plan, Other, Reporting_time, facilities_type)
      console.log(result)
      if (result === 1) {
        let response = await reqMaintain(this.userid)
        console.log(response)
        let id = response[0].id
        this.$store.dispatch('getMaintain', id)
        // this.status = false
      }
      // this.$router.push('/base')
    },
    async getPlan () {
      let result = await reqPlan(this.branch_id, this.selectBridge[0].id, this.facilities_type)
      this.plan = result[0].id
    },
    async addDis () {
      let wt = plus.nativeUI.showWaiting('病害正在添加中')
      console.log('添加病害')
      await this.location()
      let {baseinfo_id, diseaseName, reportNum, diseaseNum, metar, longitude, latitude,disPosition, structure} = this
      let data = await reqAddDis(baseinfo_id, diseaseName, reportNum, diseaseNum, metar, longitude, latitude, disPosition, structure)
      if (data === 1) {
        console.log(data)
        this.diseaseName = ''
        this.reportNum = ''
        this.diseaseNum = ''
        this.disPosition = ''
        this.metar = ''
        this.unit = ''
        this.Solution_Tips = ''
        this.state = '1'
        plus.nativeUI.toast('病害新增成功')
        wt.close()
      }else {
        console.log('新增失败')
        plus.nativeUI.toast('病害新增失败')
        wt.close()
      }
    },
    async report () {
      if (this.state === '0') {
        console.log('test 111')
        console.log(this.imageArr.length)
        if (this.imageArr.length !== 2) {
          plus.nativeUI.toast('请上传两张照片')
        } else {
          await this.reportCur()
          await this.addDis()
          await this.getId()
          this.upload()
          this.$store.dispatch('images', [])
        }
      }else {
        if (this.imageArr.length !== 2) {
          plus.nativeUI.toast('请上传两张照片')
        } else {
          await this.addDis()
          await this.getId()
          this.upload()
          this.$store.dispatch('images', [])
        }
      }

    },
    async disease () {
      this.disease_info = await reqDisease(this.parentId)
      console.log(this.disease_info)
    },
    async metarial () {
      this.unit = ''
      this.Solution_Tips = ''
      for (let i = 0; i < this.disease_info.length; i++) {
        if (this.diseaseName === this.disease_info[i].id) {
          this.metarials = await reqMaterial(this.disease_info[i].id)
          this.metar = this.metarials.length ? this.metarials[0].MaterialID : 31
          console.log('test   111111')
          console.log(this.disease_info[i].unit === 'square')
          this.unit = this.disease_info[i].unit === 'square' ? '㎡': 'm³'
          this.Solution_Tips = this.disease_info[i].Solution_Tips
        }
      }
    },
    async getId () {
      let res = await getMaxId()
      this.project_id = res[0].pid
    },
    start () {
      let second = 0
      let minute = 0
      setInterval(() => {
        second += 1
        if (second > 59) {
          second = 0
          minute += 1
        }
        if (minute < 10) {
          this.time = '0' + minute + ':0' + second
          if (second < 10) {
            this.time = '0' + minute + ':0' + second
          } else {
            this.time = '0' + minute + ':' + second
          }
        } else {
          this.time = minute + ':0' + second
          if (second < 10) {
            this.time = minute + ':0' + second
          } else {
            this.time = minute + ':' + second
          }
        }
      }, 1000)     // 108.9791659424,34.166705988556
    },
    get_date_str (Date) {
      let Y = Date.getFullYear()
      let M = Date.getMonth() + 1
      M = M < 10 ? '0' + M : M
      let D = Date.getDate()
      D = D < 10 ? '0' + D : D
      let H = Date.getHours()
      H = H < 10 ? '0' + H : H
      let Mi = Date.getMinutes()
      Mi = Mi < 10 ? '0' + Mi : Mi
      let S = Date.getSeconds()
      S = S < 10 ? '0' + S : S
      return Y + '-' + M + '-' + D + ' ' + H + ':' + Mi + ':' + S
   },
    location () {
      let This = this
      let map = new window.BMap.Map('map')
      let point = new window.BMap.Point(117.100856, 36.64295)
      map.centerAndZoom(point, 12)
      var geolocation = new window.BMap.Geolocation()
      geolocation.getCurrentPosition(function(r){
        if(this.getStatus() === BMAP_STATUS_SUCCESS){
          var mk = new window.BMap.Marker(r.point)
          map.addOverlay(mk)
          map.panTo(r.point)
          This.longitude = r.point.lng
          This.latitude = r.point.lat
          console.log('您的位置：'+r.point.lng+','+r.point.lat)
        }
        else {
          console.log('failed'+this.getStatus())
        }
      },{enableHighAccuracy: true})
    },
    async reportDis () {
      let wt = await plus.nativeUI.showWaiting('正在上报中')
      this.nowDate = this.get_date_str(new Date())
      let {nowDate, describe, baseinfo_id, branch_id} = this
      console.log(this)
      let response = await reqDisReport(nowDate, describe, baseinfo_id, branch_id)
      console.log('test   ............................................')
      console.log(response)
      if (response === 1) {
        this.describe = ''
        plus.nativeUI.toast('数据保存成功')
        wt.close()
        clearInterval(this.timer)
        this.$router.replace('/base')
      }else {
        plus.nativeUI.toast('上报失败')
        wt.close()
      }
    },
    async submit () {
      let This = this
      plus.nativeUI.alert('该设施本次巡查工作完成,结束任务。',async function () {
        if (This.state === '0') { //判断是否上传过病害
          await This.reportCur()
          clearInterval(This.timer)
        }else {
          await  This.addDis()
          await This.getId()
          await  This.upload()
          await This.reportDis()
        }
        This.showAlert('数据保存成功')
      },'','确定')
    },
    hideOther () {
    },
    showOther () {
      this.isShow = true
    },
    getGeo_status (){
      console.log('turn')
      let context = plus.android.importClass('android.content.Context')
      let locationManager=plus.android.importClass('android.location.LocationManager')
      let main=plus.android.runtimeMainActivity()
      let mainSvr=main.getSystemService(context.LOCATION_SERVICE)
      let turn = mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)
      if (turn === false) {
        plus.nativeUI.toast('请手动打开位置信息')
      }
      console.log(mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER))
},
    showAlert(alertText) {
      this.alertShow = true
      this.alertText = alertText
    },
    closeTip () {
      this.alertShow = false
      this.alertText = ''
      this.$router.replace('/base')
    },
    goBack () {
      this.showAlert('您确定要放弃本次查询?')
    }
  },
  components: {
    HeaderTop,
    Camera1,
    Footer,
    AlertTip
  }
}
</script>

<style scoped>

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
  span {
    font-size: 14px;
    margin-top: 2px;
    margin-bottom: 2px;
    font-weight: bold;
    color: #000;
    cursor: pointer;
  }
  .content {
    width: 100%;
    height: 100%;
    background: #fff;

  }
  .login_content {
    width:90%;
    padding-top: 40px;
    margin: 0 auto 50px auto;
  }
  .login_content .login_message_maintain {
    position: relative;
    margin-top: 20px;
    height: 40px;
    font-size: 14px;
    background: #fff;
  }
  .login_content .login_message:first-child {
    margin-top: 12px;
  }
  .login_content .login_message {
    position: relative;
    margin-top: 8px;
    margin-bottom: 10px;
    height: 38px;
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
