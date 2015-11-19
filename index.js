var express = require('express');
var exphbs  = require('express-handlebars');
var jsf = require('json-schema-faker');
var schema = require('./schema.json');
var webpack = require('webpack');
var browserSync = require('browser-sync').create();

var app = express();
var data = jsf(schema);

app.engine('hbs', exphbs({
  defaultLayout: 'layout',
  extname: '.hbs',
  layoutsDir: './views/'
}));

app.set('view engine', 'hbs');
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('home', {
    products: data
  });
});

// Simple web server
var server = app.listen(4000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);

  browserSync.init({
    proxy: "http://localhost:" + port,
    files: ["views/*.hbs"]
  });

  // Watching JS files
  var compiler = webpack({
    entry: "./js/app.js",
    output: {
      path: "./public/js",
      filename: "app.js"
    },
    module: {
      loaders: [
        { test: /\.js$/,
          loader: 'babel',
          query: {
            cacheDirectory: true,
            presets: ['es2015']
          }
        }
      ]
    },
    devtool: '#source-map'
  });

  compiler.watch({ aggregateTimeout: 300 }, function(err, stats) {
    console.log(stats.toString({
      colors: true,
      chunks: false
    }));

    browserSync.reload();
  });
});
