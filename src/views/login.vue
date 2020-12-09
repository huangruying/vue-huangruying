<template>
  <div class="login">
      <div class="bgd_box">
          <div>
              <div class="logo"><img src="../assets/logo.png" alt=""></div>
              <div class="title">代理商登录</div>
          </div>
      </div>
      <div class="input_box">
          <div class="cell_box">
              <img src="../assets/shouji.png" alt="">
              <van-field v-model="mobile" type="tel" placeholder="请输入手机号" maxlength="11" @input="inputUpData"/>
          </div>
          <div class="cell_box" v-if="switchoverText === '验证码登录'">
              <img src="../assets/mima.png" alt="">
              <van-field v-model="password" type="password" placeholder="请输入密码" @input="inputUpData"/>
          </div>
          <div class="cell_box" v-if="switchoverText === '密码登录'">
              <van-field v-model="code" type="text" placeholder="请输入验证码" maxlength="8" @input="inputUpData"/>
              <div class="text" @click="getCode">{{ codeText }}</div>
          </div>
          <div class="forget_the_password" @click="switchover" v-if="switchoverText === '验证码登录'">忘记密码</div>
      </div>
      <div class="btn" :class="disabled? 'disabled': ''" @click="login">登录</div>
      <div class="switchover" @click="switchover">{{ switchoverText }}</div>
      <div class="register_btn" @click="register">没有账号？去注册</div>
  </div>
</template>

<script>
import api from '../api/index'
import formatTime from '../utils/formatTime'
export default {
    data(){
        return{
            mobile: "",
            password: "",
            code: "",
            switchoverText: "验证码登录",
            codeText: "获取验证码",
            tiems: false,
            timeId: null,
            disabled: true
        }
    },
    mounted (){
        // localStorage.setItem("UserId", "122")
    },
    methods: {
        login(){
            if(this.disabled){
                this.$toast("输入有误！")
                return
            }
            if(this.switchoverText === "验证码登录"){
                api.pwd_dls_login({
                    mobile: this.mobile,
                    password: this.password
                }).then(res=>{
                    if(res.code == 1){
                        var date = formatTime(res.data.expires_in,'yyyy-mm-dd hh:mm:ss')
                        console.log(res.data.expires_in);
                        console.log(date);
                        this.$toast.success("登录成功！")
                        localStorage.setItem("UserId", res.data.user_id)
                        localStorage.setItem("token", res.data.access_token)
                        localStorage.setItem("mobile", res.data.mobile)
                        this.$router.push({name: "index"})
                    }else{
                        this.$toast(res.message)
                    }
                })
            }else{
                api.pwd_dls_login({
                    mobile: this.mobile,
                    code: this.code
                }).then(res=>{
                    if(res.code == 1){
                        var date = formatTime(res.data.expires_in,'yyyy-mm-dd hh:mm:ss')
                        console.log(res.data.expires_in);
                        console.log(date);
                        this.$toast.success("登录成功！")
                        localStorage.setItem("UserId", res.data.user_id)
                        localStorage.setItem("token", res.data.access_token)
                        localStorage.setItem("mobile", res.data.mobile)
                        this.$router.push({name: "index"})
                    }else{
                        this.$toast(res.message)
                    }
                })
            }
        },
        inputUpData(){
           let bl = this.regMobile(this.mobile)
           if(this.switchoverText === "验证码登录"){
               if(this.password && bl){
                  this.disabled = false 
               }else{
                  this.disabled = true
               }
           }else{
               if(this.code && bl){
                   this.disabled = false 
               }else{
                   this.disabled = true 
               }
           }
        },
        register(){
            this.$router.push({name: "register"})
        },
        regMobile(mobile){
            var myreg = /^1\d{10}$/
            if(myreg.test(mobile)){
                return true
            }else{
                return false
            }
        },
        getCode(){
            var myreg = /^1\d{10}$/
            if (this.tiems) {
                return false;
            }
            if(!this.mobile){
                this.$toast("请输入手机号！")
            }else if(!myreg.test(this.mobile)){
                this.$toast("手机号格式不正确！")
            }else{
                var num = 60;
                this.timeId = setInterval(() => {
                    if (num === 0) {
                        clearInterval(this.timeId)
                        this.tiems = false
                        this.codeText = "获取验证码"
                    } else {
                        this.tiems = true
                        this.codeText = num-- + "s"
                    }
                }, 1000);
                api.sendSms({mobile: this.mobile,sign: 2}).then(res=>{
                    if(res.code == 1){
                         this.$toast.success("发送成功")
                    }else{
                        this.$toast(res.message)
                    }
                })
            }
        },
        switchover(){
            this.inputUpData()
            if(this.switchoverText === "验证码登录"){
                this.switchoverText = "密码登录"
            }else{
                this.switchoverText = "验证码登录"
            }
        }
    }
}
</script>

<style lang="less" scoped>
.register_btn{
    text-align: right;
    font-size: 14px;
    color: #0ca2ff;
    padding-right: 20px;
    margin-top: 30px;
}
.switchover{
    font-size: 12px;
    color: #0ca2ff;
    margin-top: 30px;
    text-align: center;
}
.btn{
    width: 90%;
    border-radius: 8px;
    text-align: center;
    padding: 10px 0;
    margin: 50px auto 0;
    background: #0ca2ff;
    color: #fff;
    &:active{
        background-color: #eee;
    }
    &.disabled{
        background: #f2f2f2;
        color: #ccc;
    }
}
.input_box{
    background: #fff;
    width: 90%;
    margin: -30px auto 0;
    padding: 50px 30px 0;
    .forget_the_password{
        font-size: 13px;
        color: #0ca2ff;
        margin-top: 8px;
    }
    .cell_box{
        padding: 12px 0 5px;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        .text{
            color: #0ca2ff;
            font-size: 13px;
            width: 90px;
            text-align: center;
        }
        >img{
            width: 20px;
            height: 20px;
            margin-right: 10px;
        }
    }
}
.bgd_box{
    width: 100%;
    height: 200px;
    background: #0ca2ff;
    padding-top: 20px;
    >div{
        .logo{
            >img{
                margin: 0 auto;
                border-radius: 50%;
                width: 70px;
                height: 70px;
            }
        }
       .title{
           text-align: center;
           color: #fff;
           margin-top: 18px;
           font-size: 24px;
       }
    }
}
</style>