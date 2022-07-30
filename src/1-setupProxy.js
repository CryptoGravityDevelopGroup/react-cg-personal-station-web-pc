const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: "http://18.144.74.181:26888", // 端口自己配置合适的
      pathRewrite: {
        "^/api": "/",
      },
      changeOrigin: true,
    })
  )
}








