<template>
    <div>
        <div class="tabbar">
            <div>
                <img src="@/assets/yaoqingcolor.png" alt="" v-if="ifactive == 3">
                <img src="@/assets/yaoqing.png" alt="" v-else @click="goPage(3)">
                <span>邀请</span>
            </div>
            <div>
                <img src="@/assets/mycolor.png" alt="" v-if="ifactive == 2">
                <img src="@/assets/my.png" alt="" v-else @click="goPage(2)">
                <span>用户列表</span>
            </div>
            <div>
                <img src="@/assets/yuecolor.png" alt="" v-if="ifactive == 1">
                <img src="@/assets/yue.png" alt="" v-else @click="goPage(1)">
                <span>我的余额</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        active: {
            type: Number,
            default: 1
        }
    },
    computed: {
        ifactive:{
            get(){
                return this.active
            },
            set(val){
                this.$emit('update:active', val)
            }
        }
    },
    data(){
        return {
        }
    },
    methods: {
        goPage(number){
            if(number === 1){
                this.$router.push(
                    {name: 'index'},
                    onComplete => {}, // 避免到当前位置的冗余导航
                    onAbort => {}     // 避免到当前位置的冗余导航
                )
            }else if(number === 2){
                this.$router.push(
                    {name: 'userList'},
                    onComplete => {}, 
                    onAbort => {}     
                )
            }else{
                this.$router.push(
                    {name: 'invite'},
                    onComplete => {}, 
                    onAbort => {}     
                )
            }
        }
    }
}
</script>

<style lang="less" scoped>
.tabbar{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 55px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 35px;
    border-top: 1px solid #eeeeee;
    >div{
        display: flex;
        align-items: center;
        flex-direction: column;
        >img{
            width: 26px;
            height: 26px;
        }
        >span{
            font-size: 13px;
        }
    }
}
</style>