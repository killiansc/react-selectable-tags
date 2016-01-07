var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var apiRoutes = require('./api/routes');

var app = new express();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Front-end configuration /////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Webpack configuration
if (process.env.NODE_ENV === 'development') {
    var webpack = require('webpack');
    var config = require('./webpack.development.js');
    var compiler = webpack(config);
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
    app.use(webpackHotMiddleware(compiler));
}

// Serve public path
app.use(express.static(path.resolve(__dirname, 'public')));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Back-end configuration //////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', apiRoutes);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Serve, server! //////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var port = process.env.PORT || 1993;

app.listen(port, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
});