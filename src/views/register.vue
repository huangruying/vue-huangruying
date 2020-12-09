<template>
  <div class="register">
      <div class="bgd_box">
          <div>
              <div class="logo"><img src="../assets/logo.png" alt=""></div>
              <div class="title">代理商注册</div>
          </div>
      </div>
      <div class="input_box">
          <div class="cell_box">
              <img src="../assets/shouji.png" alt="">
              <van-field v-model="mobile" type="tel" placeholder="请输入手机号" maxlength="11" @input="inputUpData"/>
          </div>
          <div class="cell_box">
              <img src="../assets/shouji.png" alt="">
              <van-field v-model="agent_mobile" type="tel" placeholder="请输入推广代理商手机号" maxlength="11" @input="inputUpData"/>
          </div>
          <div class="cell_box">
              <img src="../assets/mima.png" alt="">
              <van-field v-model="password" type="password" placeholder="请输入密码" @input="inputUpData"/>
          </div>
          <div class="cell_box">
              <img src="../assets/mima.png" alt="">
              <van-field v-model="password_confirmation" type="password" placeholder="确认密码" @input="inputUpData"/>
          </div>
          <div class="cell_box">
              <van-field v-model="code" type="text" placeholder="请输入验证码" maxlength="8" @input="inputUpData"/>
              <div class="text" @click="getCode">{{ codeText }}</div>
          </div>
      </div>
      <div class="btn" :class="disabled? 'disabled': ''" @click="registerGoTolIndex">注册</div>
      <div class="register_btn" @click="register">已有账号？去登录</div>
  </div>
</template>

<script>
import api from '../api/index'
export default {
    data(){
        return{
            mobile: "",
            password: "",
            password_confirmation: "",
            code: "",
            agent_mobile: "",
            codeText: "获取验证码",
            tiems: false,
            timeId: null,
            disabled: true
        }
    },
    mounted (){
        var mobile = this.$route.query
        if(mobile.mobile){
            this.agent_mobile = mobile.mobile
        }
    },
    methods: {
        registerGoTolIndex(){
            if(this.disabled){
                this.$toast("填写有误")
                return
            }
            api.agent_register({
                mobile: this.mobile,
                password: this.password,
                password_confirmation: this.password_confirmation,
                code: this.code,
                agent_mobile: this.agent_mobile
            }).then(res=>{
                if(res.code == 1){
                    this.$toast.success("注册成功！")
                    localStorage.setItem("UserId", res.data.user_id)
                    localStorage.setItem("token", res.data.access_token)
                    localStorage.setItem("mobile", res.data.mobile)
                    this.$router.push({name: "index"})
                }else{
                    this.$toast(res.message)
                }
            })
        },
        inputUpData(){
           let bl = this.regMobile(this.mobile)
           let bl2 = this.regMobile(this.agent_mobile)
           if(bl && bl2 && this.password && this.password_confirmation && this.code){
               if(this.password != this.password_confirmation){
                   this.disabled = true
               }else{
                    this.disabled = false
               }
           }else{
               this.disabled = true 
           }
        },
        register(){
            this.$router.push({name: "login"})
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
                api.sendSms({mobile: this.mobile,sign: 1}).then(res=>{
                    if(res.code == 1){
                        this.$toast("发送成功")
                    }else{
                        this.$toast(res.message)
                    }
                })
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