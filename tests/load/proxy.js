'use strict';

var httpProxy = require('http-proxy');

var proxyPort = 3001;

httpProxy.createServer(function (req, res, proxy) {
    var original = req.headers.host;
    var isForio = /(api\.)?forio.com|localhost/.test(original);

    proxy.proxyRequest(req, res, {
        host: isForio ? 'localhost' : original,
        port: isForio ? '8001' : /\:\d+$/.test(original) ? original.match(/\:(\d+)$/)[1] : '80'
    });
}).listen(proxyPort);

console.log('Listening on %s', proxyPort);