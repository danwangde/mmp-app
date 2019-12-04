<template>
  <div>
    <div id="allmap"></div>
    <select v-model="selType" title="" style="z-index: 9999;top:45px;position:absolute;" @change="getType">
      <option value="">设施类型</option>
      <option v-for="(x, index) in types" :key="index" :value="x.value">{{x.name}}</option>
    </select>
    <section v-if="type" key="1">
      <select v-model="selected" title="" style="z-index: 9999;top:45px;position:absolute;left:32%;" @change="selPosition" >
        <option value="">设施下拉列表</option>
        <option v-for="(x, index) in bridge" :key="index" :value="x.BridgeID">{{x.BridgeName}}</option>
      </select>
    </section>
    <section v-else key="2">
      <select v-model="selected" title="" style="z-index: 9999;top:45px;position:absolute;left:32%;" @change="selPosition" >
        <option value="">设施下拉列表</option>
        <option v-for="(x, index) in bridge" :key="index" :value="x.BridgeID">{{x.BridgeName}}</option>
      </select>
    </section>


  </div>
</template>
<script>
import {mapState} from 'vuex'
window.go = function () {
  if (confirm('您确定开始设施巡查吗？')) {
    window.open('#/disease')
  }
}
let map
export default{
  name: 'bd-map',
  props: {},
  data () {
    return {
      selType: '',
      types: [
        {name:'桥梁',value: '0'},
        {name:'人行通道',value: '1'},
      ],
      type: true,
      info: '',
      opts: {
        width: 230, // 信息窗口宽度
        height: 120, // 信息窗口高度
        borderRadius: 12,
        title: '设施信息', // 信息窗口标题
        enableMessage: true// 设置允许信息窗发送短息
      },
      state: {bridge: 1, road: 2, tunnel: 3},
      selected: '',
      map: []
    }
  },
  computed: {
    ...mapState(['bridge'])
  },
  methods: {
    initMap () {
      // 初始化地图
      map = new window.BMap.Map('allmap')
      let point = new window.BMap.Point(116.983253, 36.690237)
      map.centerAndZoom(point, 18)
      // map.addOverlay(new window.BMap.Marker(point))
      // window.map = map

      map.enableScrollWheelZoom() // 启用滚轮放大缩小，默认禁用
      map.enableContinuousZoom() // 启用地图惯性拖拽，默认禁用
      // map.addControl(new window.BMap.MapTypeControl())
      console.log(this.bridge)
      // this.mapData(this.bridge)
    },
    mapData (data) {
      console.log(data)
      for (var i = 0; i < data.length; i++) {
        var marker = ''
        marker = new window.BMap.Marker(new window.BMap.Point(data[i].BridgeLON, data[i].BridgeLAT), { icon: this.addIcon(this.state.bridge) }) // 创建标注
        var content =
          `设施名称:${data[i].BridgeName} <br>
                     设施编号:${data[i].BridgeNum} <br>
                     设施总长:${data[i].TotalLength} <br>
                     巡查次数:${data[i].TotalLength} <br>
                      <a href="#/disease" id="${data[i].BridgeID}"   style="position: absolute;text-decoration: none;right:20px;top:30px;line-height:50px;border-radius: 4px;border:2px solid #948888;width:60px;height:50px;text-align:center;cursor: pointer;">
                      <span style="font-size: 10px;">开始</span><span style="font-size: 10px;">巡查</span>
                      </a>`

        map.addOverlay(marker) // 将标注添加到地图中   href="#/disease"
        // marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        // marker.enableDragging();           // 不可拖拽
        // map.openInfoWindow(new window.BMap.InfoWindow(content, This.opts), point) // 开启信息窗口
        this.addClickHandler(content, marker)

      }
    },
    addIcon (state) {
      var myIcon = null
      if (state === this.state.bridge) {
        myIcon = new window.BMap.Icon('static/img/location-norma.png', new window.BMap.Size(50, 50), {
          anchor: new window.BMap.Size(48, 48)
        })
      } else if (state === this.state.road) {
        myIcon = new window.BMap.Icon('./img/location-norma.png-alarm.png', new window.BMap.Size(50, 50), {
          anchor: new window.BMap.Size(48, 48)
        })
      } else {
        myIcon = new window.BMap.Icon('./img/location-location-norma.png', new window.BMap.Size(50, 50), {
          anchor: new window.BMap.Size(48, 48)
        })
      }
      return myIcon
    },
    async getType () {
      if (this.selType === '0') {
        await this.$store.dispatch('getBridge')
        await this.$store.dispatch('getFacility', this.selType)
        this.type = true
      }else {
        await this.$store.dispatch('getPassage')
        await this.$store.dispatch('getFacility',this.selType)
        this.type = false
      }
    },
    addClickHandler (content, marker) {
      let This = this
      marker.addEventListener('click', function (e) {
        This.openInfo(content, e)
      }
      )
    },
    selPosition () {
      console.log(this.selType)
      map.clearOverlays()
      this.map = []
      let arr = []
      let obj = {}
      let newPoint
      let content
      for (let i = 0; i < this.bridge.length; i++) {
        if (this.selected === this.bridge[i].BridgeID) {

          obj.name = this.bridge[i].BridgeName
          obj.id = this.bridge[i].BridgeID
          // name = this.bridge[i].BridgeName
          content =
            `设施名称:${this.bridge[i].BridgeName} <br>
                     设施编号:${this.bridge[i].BridgeNum} <br>
                     设施总长:${this.bridge[i].TotalLength} <br>
                     巡查次数:${this.bridge[i].TotalLength} <br>
                      <a href="#/disease" id="${this.bridge[i].BridgeID}"   style="position: absolute;text-decoration: none;right:20px;top:30px;line-height:50px;border-radius: 4px;border:2px solid #948888;width:60px;height:50px;text-align:center;cursor: pointer;">
                      <span style="font-size: 10px;">开始</span><span style="font-size: 10px;">巡查</span>
                      </a>`
          newPoint = new window.BMap.Point(this.bridge[i].BridgeLON, this.bridge[i].BridgeLAT)
          map.centerAndZoom(newPoint, 18)
          this.map.push(this.bridge[i])
        }
      }
      arr.push(obj)
      this.mapData(this.map)
      map.openInfoWindow(new window.BMap.InfoWindow(content, this.opts), newPoint) // 开启信息窗口
      this.$store.dispatch('getSelBri', arr)
      // this.$router.push('/patrol')
      console.log(this.selected)
    },
    openInfo (content, e) {
      let This = this
      var p = e.target
      var point = new window.BMap.Point(p.getPosition().lng, p.getPosition().lat)
      var infoWindow = new window.BMap.InfoWindow(content, This.opts) // 创建信息窗口对象
      map.openInfoWindow(infoWindow, point) // 开启信息窗口
    },
    go () {
      console.log('开始巡查')
    }
  },
  async mounted () {
    /*await this.$store.dispatch('getBridge')
    await this.$store.dispatch('getPassage')*/
    await this.$store.dispatch('getMap')
    await this.initMap()
    // this.mapChange()
  }
}
</script>
<style scoped>
  #allmap {
    width: 100%;
    height: 620px;
    position: absolute;
    top:45px;
    overflow: hidden;
    background-color: lightgreen;
  }
  select {
    display: inline-block !important;
    height: 34px;
    border-radius: 4px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;

    /*color: #c9c9ca;*/
    background-color: #f6fafd;
    background-image: none;
    border: 1px solid #c0d2ef;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    position: absolute;
    top: 100px;
    opacity: 0.6;
    /*left: 50%;*/
   /* transform: translate(-50%, -50%);*/
  }
</style>
