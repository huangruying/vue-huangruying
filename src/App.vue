<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
          <!-- 这里是会被缓存的视图组件 -->
      </router-view>
    </keep-alive>
    
    <router-view v-if="!$route.meta.keepAlive">
        <!-- 这里是不被缓存的视图组件 -->
    </router-view>
  </div>
</template>
<script>
import baseUrl from '@/utils/baseUrl'
export default {
  methods:{
    getOpenId(){
       const url = encodeURIComponent(window.location.href)
       window.location.href = `${baseUrl}/wxAuthorize?url=${url}`
    },
    reserveGetOpenId(){
       const url = encodeURIComponent(window.location.href)
       window.location.href = `${baseUrl}/reverseWxAuthorize?url=${url}`
    }
  }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000;
}
</style>
