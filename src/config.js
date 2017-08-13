const colors = require('colors/safe');
const dateformat = require('dateformat');


module.exports = {

  connection: {
    port: 4000,
  },

  watch: true,

  logger: {
    log(msg, namespace) {
      const INFO = colors.cyan('INFO');
      const date = colors.grey.bold(dateformat('HH:MM:ss'));  // Now date
      console.log(`[${INFO}] ${date} ${msg}`);
    },
    warn(msg, namespace) {
      const WARN = colors.yellow('WARN');
      const date = colors.bold(dateformat('HH:MM:ss'));  // Now date
      const ns = namespace || path.basename(__dirname);
      console.log(`[${WARN}][${ns}] ${date} ${msg}`);
    },
    error(msg, namespace) {
      const ERROR = colors.red('ERROR');
      const date = colors.bold(dateformat('HH:MM:ss'));  // Now date
      const ns = namespace || path.basename(__dirname);
      console.log(`[${ERROR}][${ns}] ${date} ${msg}`);
    },
  },

};
