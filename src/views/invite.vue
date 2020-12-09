<template>
  <div>
    <div class="title">邀请码</div>
      <div class="invite_box">
        <div class="qrcode_box">
            <div id="qrcode" class="qrcode"></div> 
        </div>
        <div class="img_box">
            <img src="../assets/user.png" alt="">
        </div>
      </div>
      
      <tabbar :active.sync="active"></tabbar>
  </div>
</template>

<script>
import tabbar from '@/components/tabbar'
import QRCode from 'qrcodejs2'  // 引入qrcode
export default {
  components: {
    tabbar
  },
  data(){
    return{
      active: 3,
    }
  },
  mounted () {
    var id = localStorage.getItem("UserId")
     if(!id || id == "undefined" || id == "null"){
       this.$router.push({name: "login"})
     }
    this.qrcode();
  },
  methods: {
    qrcode() {
      // var href = window.location.host
      var href = window.location.href
      var arr = href.split("/")
      arr.pop()
      var hrefs = arr.join("/")
      var mobile = localStorage.getItem("mobile")
      let qrcode = new QRCode('qrcode', {
        width: 230,  
        height: 230,
        text: hrefs + "/register?mobile=" + mobile  // 二维码地址
      })
    }
  }
}
</script>

<style lang="less" scoped>
.title{
  text-align: center;
}
.invite_box{
    position: relative;
    .img_box{
      width: 40px;
      height: 40px;
      border-radius: 4px;
      background: #fff;
      position: absolute;
      top: 240px;
      left: 50%;
      transform: translateX(-50%);
    }
    .qrcode_box{
        position: absolute;
        top: 130px;
        left: 50%;
        transform: translateX(-50%);
    }
    .qrcode{
        width: 250px;
        height: 250px;
    }
}
</style>