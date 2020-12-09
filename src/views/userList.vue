<template>
  <div class="userList">
      <div class="title">用户注册列表</div>
      <div class="user_list">
        <div class="list_box" v-for="(value,index) in userList" :key="index">
            <img :src="value.avatar" alt="">
            <div>
              <div class="top">
                  <div>{{ value.name }}</div>
                  <span>{{ value.mobile }}</span>
              </div>
              <span :class="value.is_vip == 1?'color': ''">{{ value.is_vip == 1? "VIP用户":"VIP用户" }}</span>
              <div class="date">时间：{{ value.created_at }}</div>
            </div>
        </div>
        <div v-if="userList.length === 0" class="nodata">暂无数据~</div>
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
      active: 2,
      userList: []
    }
  },
  mounted(){
    var id = localStorage.getItem("UserId")
     if(!id || id == "undefined" || id == "null"){
       this.$router.push({name: "login"})
     }else{
       this.getData()
     }
  },
  methods: {
    getData(){
      api.agent_list().then(res=>{
        if(res.code == 1){
          this.userList = res.data.list
        }else{
          this.$toast(res.message)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.nodata{
  text-align: center;
  font-size: 14px;
  color: #666;
  margin-top: 40px;
}
.user_list{
    background: #fff;
    border-radius: 10px;
    margin: -30px 10px 0 10px;
    .list_box{
      display: flex;
      border-bottom: 1px solid #ccc;
      padding-bottom: 18px;
      padding-top: 15px;
      >img{
        width: 50px;
        height: 50px;
        border-radius: 50%
      }
      >div{
        flex: 1;
        padding-left: 20px;
        >span{
          color: #ccc;
          font-size: 14px;
          display: block;
          margin-top: 10px;
          &.color{
            color: #0ca2ff;
          }
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
}
.title{
    text-align: center;
    padding: 10px 0 20px;
}
</style>