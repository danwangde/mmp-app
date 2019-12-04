<template>
   <section class="content">
     <HeaderTop :title="title" />

     <div class="login_content">
       <form action="">
         <section >
           <section v-show="status">
             <section class="login_message">
               <label class="disease-label" style="width: 20%;">病害单号:</label>
               <select v-model="Odd_Numbers" title="" @change="getInfo" style="width: 70%;" >
                 <option value="" hidden>单号</option>
                 <option v-for="(x, index) in Numbers" :key="index" :value="x.Odd_Numbers" >{{x.Odd_Numbers}}</option>
               </select>
             </section>
             <section class="login_message">
                 <label class="disease-label" style="width: 20%;">设施名称:</label>
               <input type="text" maxlength="50" placeholder="设施名称" v-model="facilitiesname" disabled style="width: 70%;">
             </section>
             <section class="login_message">
                <label class="disease-label" style="width: 20%;">病害名称:</label>
               <select v-model="diseaseName" title="" @change="getProject" style="width: 50%;">
                 <option value="" hidden>病害名称</option>
                 <option v-for="(x, index) in disData" :key="index" :value="x" >{{x.disease_name}}</option>
               </select>
               <span style="cursor: pointer;" @click="open">详细信息</span>
             </section>
             <section class="login_message" >
               <label class="disease-label" style="width: 20%;">完成时限:</label>
               <span type="text" maxlength="50" style="width: 70%;" >{{val1}}</span>
             </section>
             <section class="login_message" >
               <label class="disease-label" style="width: 20%;">处置要求:</label>
               <span type="text" maxlength="50" style="width: 70%;" >{{val2}}</span>
             </section>
             <section class="login_message">
               <label class="disease-label" style="width: 20%;">养护项目:</label>
               <select v-model="project" title="" style="width: 30%;">
                 <option value="" hidden>养护项目</option>
                 <option v-for="(x, index) in disProject" :key="index" :value="x" >{{x.project}}</option>
               </select>
               <label class="disease-label" style="width: 20%;">数量:</label>
               <input type="text" maxlength="50" placeholder="申报数量" v-model="Check_num" style="width: 30%;">
               <img src="../../assets/add.png" alt="" style="height: 14px; width: 14px;" @click="addItem">
             </section>
             <table style="border: 1px solid #333333;width: 100%; margin-top: 20px;">
               <thead>
               <tr style="border: 1px solid #333333;">
                 <th  style="border: 1px solid #333333;">养护项目</th>
                 <th  style="border: 1px solid #333333;">数量</th>
               </tr>
               </thead>
               <tbody>
               <tr v-for="(x,index) in maintainArr" :key="index" style="border: 1px solid #333333;">
                 <td  style="border: 1px solid #333333;">{{x.projectName}}</td>
                 <td  style="border: 1px solid #333333;" align="center">{{x.Check_num}}</td>
               </tr>
               </tbody>
             </table>
             <Camera :photo_type="photo_type" style="position: absolute; left: 40px;"/>
             <Camera :photo_type="photo_type" style="position: absolute; left: 200px;" />
             <button class="disease_submit" @click.prevent="report" v-show="false">新增养护项目</button>
             <button class="disease_submit" @click.prevent="hideOther" v-show="false">准备申报</button>
           </section>
           <section v-show="!status" style="margin-top:60px;">
             <section class="login_message">
               <!--  <label class="disease-label">所属结构:</label>-->
               <input type="text" placeholder="完工时间" id="finishTime" v-model="Completion_time">
             </section>
             <section class="login_message">
               <!--  <label class="disease-label">所属结构:</label>-->
               <input type="text" placeholder="提交人"  v-model="submitter">
             </section>
             <section class="login_message">
               <!--  <label class="disease-label">所属结构:</label>-->
               <input type="text" placeholder="概算费用"  v-model="Cost">
             </section>
             <section class="login_message">
               <!--  <label class="disease-label">所属结构:</label>-->
               <input type="text" placeholder="申报时间" id="reportTime" v-model="Reporting_time">
             </section>
             <section class="login_message">
               <!--  <label class="disease-label">所属结构:</label>-->
               <input type="text" placeholder="备注"  v-model="Remarks">
             </section>
           </section>
         </section>
       </form>
     </div>

     <div class="alert_container"  v-show="alertShow">
       <section class="tip_text_container login_content">
         <section class="login_message_modal">
           <label class="disease-label" style="width: 20%;">病害名称:</label>
           <span type="text" style="width: 70%;">{{diseaseName.disease_name}}</span>
         </section>
         <section class="login_message_modal">
           <label class="disease-label" style="width: 20%;">病害数量:</label>
           <span type="text" style="width: 70%;">{{diseaseName.Reported_quantity}}</span>
         </section>
         <section class="login_message_modal">
           <label class="disease-label" style="width: 20%;">所属结构:</label>
           <span type="text" style="width: 70%;">{{diseaseName.structure === '0'? '车行道':diseaseName.structure === '1'? '人行道': diseaseName.structure === '2'? '结构': diseaseName.structure === '3'? '附属设施': ''}}</span>
         </section>
         <section class="login_message_modal">
           <label class="disease-label" style="width: 20%;">详细地址:</label>
           <span type="text" style="width: 70%;">{{diseaseName.disPosition}}</span>
         </section>
         <section class="login_message_modal">
           <label class="disease-label" style="width: 20%;">其他描述:</label>
           <span type="text" style="width: 70%;"></span>
         </section>
         <section class="login_message_modal">
           <label class="disease-label" style="width: 20%;">解决方法提示:</label>
           <span type="text" style="width: 70%;">{{diseaseName.Solution_Tips}}</span>
         </section>
         <section class="login_message_modal">
           <div class="disease-label" style="width: 100%;">图片:</div>
           <a type="text" style="width: 40%;display:inline-block;margin-right:20px;" v-for="(item, index) in image" :key="index">
            <img :src="`http://47.92.137.78:5000/${item.photo_name}`" :id="index" alt="" style="width: 90px; height: 45px;position: relative; top: 20px;left: 20px;" @click="screenMax(index)">
          </a>
         </section>
         <br>
         <br>
         <br>
         <br>
         <div class="confrim" @click="close">确认</div>
       </section>
     </div>

     <!--<Modal @closeTip="close" v-show="alertShow" :disname="diseaseName.disease_name"
            :disnum="diseaseName.Reported_quantity" :structure="diseaseName.structure" :disPosition="diseaseName.disPosition" :Solution_Tips="diseaseName.Solution_Tips"
              :image="image"
     ></Modal>-->
     <Footer>
       <a class="guide_item" slot="left" style="text-decoration:none;" @click="report">
        <span>上传维修数据</span>
      </a>
       <a class="guide_item"  slot="right" @click="goBack" style="text-decoration:none;">
         <span>返回首页</span>
       </a>
     </Footer>
   </section>
</template>

<script>
import {reqOrder, reqDisInfo, reqDisInfoNew, reqList, reqQuantity, reqFinish, selList, selRequire, reqOddDis, getImages} from '../../api'
import {mapState} from 'vuex'
import HeaderTop from '../../components/Header/Header.vue'
import Camera from '../../components/Camera/Camera.vue'
import Footer from '../../components/Footer/Footer.vue'
import Modal from '../../components/Modal/Modal.vue'
export default {
  data () {
    return {
      arr: [],
      status: true,
      Odd_Numbers: '',
      title: '养护维修',
      project: '',
      number: '',
      isShow: true,
      diseaseName: {},
      Numbers: [],
      disData: [],
      disProject: [],
      alertShow: false,
      unitPrice: '',
      Check_num: '',
      declare_num: '0',
      Completion_time: '',
      Reporting_time: '',
      submitter: '',
      Cost: '',
      Remarks: '',
      photo_type: '1',
      photo_type_dis: '0',
      val1: '',
      val2: '',
      image: [],
      src: '',
      maintainArr: []
    }
  },
   mounted () {
    this.getOrder()
    let This = this
    laydate.render({
      elem: '#finishTime', // 指定元素
      type: 'datetime', // 组件的类型：year,month,time···
      format: 'yyyy-MM-dd HH:mm', //  设置显示格式
      done: value => { // 点击确认执行的回调函数，会把当前选择的时间传入进来
        // 把选择的时间赋值给先前定义好的变量，显示在页面
        This.Completion_time = value
      }
    })
    laydate.render({
      elem: '#reportTime', // 指定元素
      type: 'datetime', // 组件的类型：year,month,time···
      format: 'yyyy-MM-dd HH:mm', //  设置显示格式
      done: value => { // 点击确认执行的回调函数，会把当前选择的时间传入进来
        // 把选择的时间赋值给先前定义好的变量，显示在页面
        This.Reporting_time = value
      }
    })
  },
  computed: {
    ...mapState([ 'branch_id','baseinfo_id', 'imageArr']),
    id () {
      for (let item of this.Numbers) {
        if (this.Odd_Numbers === item.Odd_Numbers) {
          return item.id
        }
      }
    }
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
      task.addData('project_id', This.diseaseName.id.toString())
      for (let [i,item] of This.imageArr.entries()){
        console.log('length')
        console.log(item)
        console.log(i)
        task.addFile(item, {key: 'file' + i})
      }
      task.start()
    },
    screenMax (data) {
      console.log(123456)
      /*console.log(document.getElementById(data))
      document.getElementById(data).style.width = 300 + 'px'
      document.getElementById(data).style.height = 168 + 'px'*/
    },
    close () {
      this.alertShow = false
    },
    open () {
      this.alertShow = true
    },
    addItem () {// id, diseaseName.disId, project.id, declare_num, Check_num
      this.maintainArr.push({projectName: this.project.project,project: this.project.id, Check_num: this.Check_num, id: this.id, disease_name: this.diseaseName.disId, declare_num: this.declare_num})
    },
    async getOrder () {
      this.Numbers = await reqOrder(this.branch_id)
      console.log(this.Numbers)
    },
    async getList () {
      this.arr = await selList(this.id)
    },
    /*async getDisInfo () {
     this.disData = await reqDisInfo(this.id)
    },*/
    async getInfo () {
      let res = await selRequire(this.Odd_Numbers)
      this.val2 = res[0].Processing_requirements
      this.val1 = this.get_date_str(new Date(res[0].time_limit))
      for (let item of this.Numbers) {
        if (this.Odd_Numbers === item.Odd_Numbers) {
         this.facilitiesname = item.facilitiesname
        }
      }
      this.getList()
      this.disData = await reqOddDis(this.id)
      this.$store.dispatch('getMaintain', this.id)

    },
    async getProject () {
      this.disProject = await reqDisInfoNew(this.diseaseName.disId)
      let res = await getImages(this.baseinfo_id, this.photo_type_dis, this.diseaseName.id)
      this.image  = res.slice(res.length-2)
      /*for (let item of this.image) {
        item.photo_name =  'http://192.168.1.157:9000/' + item.photo_name
      }*/
      // this.$store.dispatch('getImageDis', res[0].photo_name)
      for (let item of this.disProject) {
        if (this.project === item.id) {
          this.unitPrice = item.Unit_Price
        }
      }
    },
    async report () {
      if (this.imageArr.length !== 2) {
        plus.nativeUI.toast('请上传两张照片')
      } else {
        let This = this
        plus.nativeUI.alert('您确定要上传本次维修数据吗?',async function () {
          await This.upload()
          // let {id, diseaseName, project, declare_num, Check_num} = This   //id, diseaseName.disId, project.id, declare_num, Check_num
          let result = await reqList(This.maintainArr)
          console.log(result)
          if (result === 1) {
            plus.nativeUI.toast('养护项目新增成功')
            This.getList()
          }else {
            plus.nativeUI.toast('养护项目新增失败')
          }
          This.$store.dispatch('images', [])
          This.$router.replace('/base')
        },'','确定')
      }
    },
    goBack () {
      let This = this
      plus.nativeUI.alert('您确定维修数据已经上传或者放弃本次维修吗?',async function () {
       This.$router.replace('/base')
      },'','确定')
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
    async hideOther () {
      this.status = false
      let quantityList = await reqQuantity(this.id)
      for (let item of quantityList) {
        item.total = parseFloat(item.Unit_Price * item.Check_num)
      }
      let totalCost = 0
      for (let item of quantityList) {
        totalCost += parseFloat(item.total)
      }
      this.Cost = totalCost.toFixed(2)
    },
    async completeDeclara () {
      let {Completion_time, Cost, Remarks, submitter, Reporting_time, Odd_Numbers} = this
      let result = await reqFinish(Completion_time, Cost, Remarks, submitter, Reporting_time, Odd_Numbers)
      if (result === 1) {
        plus.nativeUI.toast('竣工申报成功')
        this.$router.replace('/base')
      }else {
        plus.nativeUI.toast('竣工申报失败')
      }
    }

  },
  components: {
    HeaderTop,
    Camera,
    Footer,
    Modal
  }
}
</script>

<style scoped>
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

  .login_content .login_message_modal {
    position: relative;
    left: 0px;
    margin-top: 8px;
    width: 80%;
    float: left;
    height: 20px;
    font-size: 14px;
    background: #fff;
  }
  .login_content .login_message {
    position: relative;
    margin-top: 16px;
    height: 40px;
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
    top: 40%;
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
