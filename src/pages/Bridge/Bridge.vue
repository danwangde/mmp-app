<template>
  <section class="bridge">
    <!--首页头部-->
    <HeaderTop :title="title">
    </HeaderTop>
    <Map />
      <!--<select v-model="selected" title="" @change="selPosition">
        <option value="">设施下拉列表</option>
        <option v-for="(x, index) in bridge" :key="index" :value="x.BridgeID">{{x.BridgeName}}</option>
      </select>-->
    <Footer>
      <router-link class="guide_item"  slot="left" to="/curing" style="text-decoration:none;">
        <span>养护维修</span>
      </router-link>
      <!-- <router-link  class="guide_item"  slot="center" to="/patrol" style="text-decoration:none;" v-show="this.selectBridge">
        <span>新增查询</span>
      </router-link> -->
      <a  class="guide_item"  slot="right"  style="text-decoration:none;" @click="goLogin">
        <span>退出App</span>
      </a>
    </Footer>
  </section>
</template>

<script>
import {mapState} from 'vuex'
import HeaderTop from '../../components/Header/Header.vue'
import Map from '../../components/Map/Map.vue'
import Footer from '../../components/Footer/Footer.vue'
export default {
  data () {
    return {
      title: '市政设施巡查养护终端',
      selected: ''
    }
  },
  mounted () {
    this.$store.dispatch('getBridge')
  },
  computed: {
    ...mapState(['bridge', 'userid', 'usertype', 'selectBridge'])
  },
  components: {
    HeaderTop,
    Map,
    Footer
  },
  methods: {
    selPosition () {
      let mapData = []
      for (let i = 0; i < this.bridge.length; i++) {
        if (this.selected === this.bridge[i].BridgeID) {
          mapData.push(this.bridge[i])
        }
      }
      this.$store.dispatch('getMap', mapData)
      console.log(this.selected)
    },
    goLogin () {
      this.$router.replace('/login')
    }
  }
}
</script>

<style scoped>
  .bridge {
    width: 100%;
  }
  select {
    display: inline-block !important;
    width: 50%;
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
    left: 50%;
    transform: translate(-50%, -50%);
  }
  span {
    font-size: 14px;
    margin-top: 2px;
    margin-bottom: 2px;
    font-weight: bold;
    color: #000;
    cursor: pointer;
  }
</style>
