<template>
  <div>
    <input type="hidden" id="picIndex" value="0">
    <div id='image-list' class="row image-list" style="width: 300px; position:absolute; top: 80px;overflow: hidden;">
    </div>
    <div class="upload upload_picture" @click="showActionSheet" style="text-align: center;" v-show="isShow">
      <span style="position: relative; top: -18px;">
        <i class="iconfont icon-add" ></i>
      </span>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import $ from 'jquery'
export default {
  data () {
    return {
      isShow: true
    }
  },
  methods: {
    // 图片显示
    showPics (url, name) {
      // 根据路径读取到文件
      // file:///storage/emulated/0/Android/data/io.dcloud.HBuilder/apps/HBuilder/doc/upload/1570591224861.jpg
      console.log(name)
      let path = url.split('/').pop()
      console.log(path)
      this.$store.dispatch('getImage', path)
      plus.io.resolveLocalFileSystemURL(url, function (entry) {
        entry.file(function (file) {
          var fileReader = new plus.io.FileReader()
          fileReader.readAsDataURL(file)
          fileReader.onloadend = function (e) {
            var picUrl = e.target.result.toString()
            console.log(picUrl)
            var picIndex = $('#picIndex').val()
            console.log(picIndex)
            var nowIndex = parseInt(picIndex) + 1
            console.log(nowIndex)
            $('#picIndex').val(nowIndex)
            var html = ''
            html += '<div style="float: left !important;margin-left: 15px;"><img src="' + picUrl + '" class="upload_img" style="width:120px;height:67px;' +
              'margin-left: -10px;" /></div>'
            html += $('#image-list').html()
            $('#image-list').html(html)
          }
        })
      })
    },
    // 压缩图片
    compressImage (url, filename) {
      let This = this
      let name = '_doc/upload/' + filename
      plus.zip.compressImage({
        src: url, // src: (String 类型 )压缩转换原始图片的路径
        dst: name, // 压缩转换目标图片的路径
        quality: 40, // quality: (Number 类型 )压缩图片的质量.取值范围为1-100
        overwrite: true // overwrite: (Boolean 类型 )覆盖生成新文件
      },
      function (zip) {
        // 页面显示图片
        This.showPics(zip.target, name)
      },
      function (error) {
        plus.nativeUI.toast('压缩图片失败，请稍候再试')
      })
    },
    // 调用手机摄像头并拍照
    getImage () {
      let This = this
      var cmr = plus.camera.getCamera()
      cmr.captureImage(function (p) {
        plus.io.resolveLocalFileSystemURL(p, function (entry) {
          let path = entry.toLocalURL()
          console.log(11111111)
          console.log(path)
          This.compressImage(entry.toLocalURL(), entry.name)
          This.$store.dispatch('getImages', entry.toLocalURL())
        }, function (e) {
          plus.nativeUI.toast('读取拍照文件错误：' + e.message)
        })
      }, function (e) {}, {
        filter: 'image'
      })
    },
    // 从相册选择照片
    galleryImgs () {
      let This = this
      plus.gallery.pick(function (e) {
        var name = e.substr(e.lastIndexOf('/') + 1)
        This.compressImage(e, name)
        This.$store.dispatch('getImages', e)
        console.log(This.imageArr)
        // This.upload(e)
      }, function (e) {}, {
        filter: 'image'
      })
    },
    upload () {
      let This = this
      let server = 'http://192.168.1.162:9000/curing/insert_photo'
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
      for (let item of This.imageArr) {
        task.addFile(item, {key: 'file'})
      }
      task.start()
    },
    // 删除照片
    delPic (a) {
      $(a).next().remove()
      $(a).remove()
    },
    // 点击事件，弹出选择摄像头和相册的选项
    showActionSheet () {
      let This = this
      var bts = [{
        title: '拍照'
      }, {
        title: '从相册选择'
      }]
      plus.nativeUI.actionSheet({
        cancel: '取消',
        buttons: bts
      },
      function (e) {
        if (e.index === 1) {
          This.getImage()
        } else if (e.index === 2) {
          This.galleryImgs()
        }
      }
      )
    }
  },
  computed: {
  ...mapState(['baseinfo_id', 'imageArr'])
  },
  props: {
    photo_type: String
  }
}
</script>

<style scoped>
  .upload {
    position: relative;
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 120px;
    height: 67px;
    cursor: pointer;
    line-height: 100px;
    vertical-align: top;
    margin: 0 auto;
  }
  .upload_picture {
    text-align: center;
  }
  .image-list {
    margin-top:10px;
  }
</style>
