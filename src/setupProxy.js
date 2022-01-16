const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://3.134.244.83:8000",
      changeOrigin: true,
    })
  );
};
