const proxy = {
  '/api': {
    target: 'api.test.com',
    pathRewrite: {
      '/api': '/'
    },
    secure: false, //实现对https网址请求的转发
    bypass: function (req, res, proxyOptions) {  //代理拦截
      if (req.headers.accept.indexOf('html') !== -1) {
        return false;
      }
    },
    changeOrigin: true
  }
}
module.exports = {
  proxy
}