const path = require('path');
const hapi = require('hapi');
const inert = require('inert');
const webpack = require('webpack');
const chokidar = require('chokidar');

const config = require('./config');
const webpackConfig = require('../webpack.dev.config');



// SETUP SERVER
const server = new hapi.Server();
server.connection(config.connection);


server.event('server:register:ready');


server.register(inert, (err) => {
  if (err) {
    throw err;
  }

  server.emit('server:register:ready');
});


function runWebpack(next) {
  config.logger.log('Webpack running...')
  return webpack(webpackConfig).watch({}, (err, stats) => {
    if (err) {
      config.logger.error(err, 'app.js');
    }
    config.logger.log('Webpack finished');
    next();
  });
}


function reloadBrowser() {
  config.logger.log('Reloading browsers...');
}


server.on('server:register:ready', () => {

  // server.route({
  //   method: 'GET',
  //   path: '/',
  //   handler: (request, reply) => {
  //     // reply.redirect('/');
  //     file: path.resolve(__dirname, '../docs/404.html');
  //   },
  // });

  server.route({
    method: 'GET',
    path: '/',
    handler: {
      file: path.resolve(__dirname, '../docs/index.html'),
    },
  });

  server.route({
    method: 'GET',
    path: '/bundle/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, '../docs/bundle'),
        redirectToSlash: true,
        index: true,
      }
    },
  });

  server.start((err) => {
    if (err) {
      config.logger.error(err, 'app.js');
    }

    config.logger.log(`Server running at: ${server.info.uri}`);

    let webpackWatcher = runWebpack(reloadBrowser);

    chokidar.watch(path.resolve(__dirname, 'src'), {
      ignoreInitial: true
    })
      .on('all', () => {
        webpackWatcher.close();
        webpackWatcher = runWebpack(reloadBrowser);
      });
  });

});
