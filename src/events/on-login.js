/**
 * @desc 登录初始化
 * @date 2020-12-10 14:15:34
 */
const { onPunchCardRemind, onToWorkMyGirl } = require("../plugins/schedule");

async function onLogin (user) {
  console.log(`${user.payload.name}你好啊~`)
  await onLoginInit();
};

async function onLoginInit () {
  await onToWorkMyGirl();
  await onPunchCardRemind("* 30 18 * * *", 5, 'Lex.', 'toLexInterval');
}
module.exports = onLogin;
