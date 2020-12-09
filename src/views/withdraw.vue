<template>
  <div class="withdraw">
      <div class="cell_box">
        <van-icon name="arrow-left" @click="routerGo"/>
        <div>提现</div>
        <div></div>
      </div>
      <div class="title">提现至手机支付宝账户</div>
      <div class="input_box">
        <div class="cell_box">
              <van-field v-model="mobile" type="tel" placeholder="请输入收款手机号" maxlength="11" @input="inputUpData"/>
              <div class="text">收款手机号</div>
        </div>
        <div class="cell_box">
          <van-field v-model="number" type="number" placeholder="请输入提现金额（¥）" @input="inputUpData"/>
          <div class="text">提现金额（¥）</div>
        </div>
      </div>
      <div class="btn" :class="disabled? 'disabled': ''" @click="withdraw">确认提现</div>
  </div>
</template>

<script>
import api from "@/api/index"
export default {
  data () {
    return{
      mobile: "",
      number: "",
      disabled: true
    }
  },
  methods: {
    withdraw(){
      if(this.disabled){
        this.$toast("填写有误！")
        return
      }
      api.agent_withdraw({
        alipay: this.mobile,
        money: this.number
      }).then(res=>{
        if(res.code == 1){
          this.$toast.success("提现成功！")
        }else{
          this.$toast(res.message)
        }
      })
    },
    inputUpData(){
       let bl = this.regMobile(this.mobile)
       if(bl && this.number){
         this.disabled = false
       }else{
         this.disabled = true
       }
    },
    regMobile(mobile){
        var myreg = /^1\d{10}$/
        if(myreg.test(mobile)){
            return true
        }else{
            return false
        }
    },
    routerGo(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
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
    margin: -0 auto 0;
    padding: 10px 10px 0;
    .cell_box{
        padding: 12px 0 5px;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        .text{
            color: #9c9c9c;
            font-size: 13px;
            width: 130px;
            text-align: center;
        }
    }
}
.title{
  text-align: center;
  margin: 10px 0;
}
.cell_box{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}
</style>