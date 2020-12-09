module.exports = {
    lintOnSave: false,
    // publicPath: './',
    publicPath: './',
    // outputDir: 'dist',
    // assetsDir: 'ticket',
    devServer: {
        disableHostCheck: true,
        // https: true,
        overlay: {
          warning: false,
          errors: false
        }
        // proxy: {
        //   "/official": {
        //     // target: "http://192.168.0.160:8189/",
        //     target: "http://test2.yuyuetrip.com.cn/wash/official",
        //     // target: "http://mp.yuyuetrip.com.cn/wash/official",
        //     pathRewrite: { "^/official": "/official" },
        //     changeOrigin: true, // 是域名的话，需要这个参数，
        //     secure: true // 设置支持https协议的代理
        //   }
        // }
      }
}
