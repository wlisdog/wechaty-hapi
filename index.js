const { Wechaty } = require('wechaty');
const { onScan, onLogin, onMessage } = require('./src/events');
const { token } = require('./config');

const bot = new Wechaty({
  puppet: 'wechaty-puppet-hostie',
  puppetOptions: {
    token,
  }
});

bot
  .on('scan', onScan)
  .on('login', onLogin)
  .on('message', onMessage)
  .start()
  .then(() => console.log("ing~"))
  .catch(e => console.error(e));

module.exports.bot = bot
