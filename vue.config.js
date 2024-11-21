const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
      //实现与django的跨域连接，端口号8000是django的端口号
    proxy:{
  '/api':{
      target:'http://localhost:8000',
      changeOrigin:true,
      '^/api':''
  },
    '/static': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        '^/static': ''
    }
    }
  }
})
