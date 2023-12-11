const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/local_server',
        createProxyMiddleware({
            target: 'http://192.168.0.200/:3000',
            changeOrigin: true,
            pathRewrite: {
                '^/local_server': '',
            },
        })
    );
};
