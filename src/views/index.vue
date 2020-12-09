<template>
  <div class="index">
    <div class="bgd_box">
        <div class="user_box">
          <div class="user_text">
            <img src="../assets/user.png" alt="">
            <div>
              <span>总余额：{{ dataList.total_money }}（元）</span>
              <span style="margin-top: 6px;">可提现金额：{{ dataList.can_withdraw }}（元）</span>
            </div>
          </div>
          <div class="btn" @click="goWithdraw">提现</div>
        </div>
    </div>
    <div class="user_list">
      <div class="list">
        <span>明细列表</span>
        <div @click="negation">
          <span>{{ incomeExpend }}</span>
          <img src="../assets/xiada.png" alt="">
        </div>
      </div>
      <!-- 收入 -->
      <div class="list_box" v-for="(item,index) in incomeList" :key="index" v-show="incomeExpend === '收入'">
        <img src="../assets/user.png" alt="">
        <div>
          <div class="top">
            <div>{{ item.name }}</div>
            <span>+{{ item.money }}</span>
          </div>
          <span>{{ item.mobile }}</span>
          <div class="date">时间：{{ item.created_at }}</div>
        </div>
      </div>
      <!-- 支出 -->
      <div class="list_box" v-for="(value,idx) in expendList" :key="idx" v-show="!(incomeExpend === '收入')">
        <img src="../assets/user.png" alt="">
        <div>
          <div class="top">
            <div>{{ value.check_state_copy }}</div>
            <span>-{{ value.money }}</span>
          </div>
          <span>{{ value.alipay }}</span>
          <div class="date">时间：{{ value.created_at }}</div>
        </div>
      </div>
    </div>
    <tabbar :active.sync="active"></tabbar>
  </div>
</template>

<script>
import tabbar from '@/components/tabbar'
import api from "@/api/index"
export default {
  components: {
    tabbar
  },
  data(){
    return{
      active: 1,
      incomeExpend: "收入",
      dataList: {},
      expendList: [],
      incomeList: []
    }
  },
  mounted(){
     var id = localStorage.getItem("UserId")
     if(!id || id == "undefined" || id == "null"){
       this.$router.push({name: "login"})
     }else{
       this.getData()
       this.getList()
     }
  },
  methods: {
    negation(){
      if(this.incomeExpend === "收入"){
        this.incomeExpend = "支出"
      }else{
        this.incomeExpend = "收入"
      }
    },
    getList(){
      api.withdraw_list().then(res=>{
        if(res.code == 1 && res.data && res.data.list){
          res.data.list.map(v=>{
            if(v.check_state == 1){
              v.check_state_copy = "审核成功"
            }else if(v.check_state == 2){
              v.check_state_copy = "审核失败"
            }else{
              v.check_state_copy = "审核中"
            }
          })
          this.expendList = res.data.list
        }
      })
      api.earning_list().then(res2=>{
        if(res2.code == 1 && res2.data && res2.data.list){
          this.incomeList = res2.data.list
        }
      })
    },
    MsgSort(obj){
      obj.sort((a,b)=>{
        let t1 = new Date(Date.parse(a.created_at.replace(/-/g,"/")))
        let t2 = new Date(Date.parse(b.created_at.replace(/-/g,"/")))
        return t2.getTime()-t1.getTime()
      })
      return obj
    },
    getData(){
      api.agent_money().then(res=>{
        if(res.code == 1){
          this.dataList = res.data
        }else{
          this.$toast(res.message)
        }
      })
    },
    goWithdraw(){
      this.$router.push({name: "withdraw"})
    }
  }
}
</script>

<style lang="less" scoped>
.user_list{
    background: #fff;
    border-radius: 10px;
    margin: -30px 10px 0 10px;
    .list_box{
      display: flex;
      border-bottom: 1px solid #ccc;
      padding-bottom: 18px;
      padding-top: 12px;
      >img{
        width: 50px;
        height: 50px;
        border-radius: 50%
      }
      >div{
        flex: 1;
        padding-left: 20px;
        >span{
          color: #e3e3e3;
          font-size: 14px;
          display: block;
          margin-top: 10px;
        }
        .date{
          color: #ccc;
          font-size: 15px;
          margin-top: 10px;
        }
        .top{
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 10px;
          >span{
            color: #666;
            font-size: 14px;
          }
        }
      }
    }
    .list{
      padding: 20px 0px 10px 20px;
      display: flex;
      justify-content: space-between;
      >div{
        display: flex;
        align-items: center;
        >span{
          display: block;
          margin-right: 10px;
        }
        >img{
          width: 15px;
          height: 15px;
        }
      }
    }
}
.bgd_box{
  width: 100%;
  height: 160px;
  background: #0ca2ff;
  padding-top: 20px;
  .user_box{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    .btn{
      background: #fff;
      border-radius: 30px;
      padding: 4px 22px;
      color: #666;
      &:active{
        background: #f3f3f3;
      }
    }
    .user_text{
      display: flex;
      align-items: center;
      >img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      >div{
        >span{
          color: #fff;
          font-size: 13px;
          display: block;
          margin-left: 12px;
        }
      }
    }
    
  }
}
</style>