/**
 * @desc 登录初始化
 * @date 2020-12-10 14:15:34
 */
const { setSchedule } = require("../plugins/schedule");
const bot = require("../../index");

async function onLogin (user) {
  console.log(`${user.payload.name}你好啊~`)
  await onToMyGirl();
};

/**
 * @desc 小王上班定时~
 */
const onToMyGirl = async () => {
  const timer = "0 20 9 * * *";
  setSchedule(timer, async () => {
    let contact = await bot.bot.Contact.find({ name: '小抽基' });
    await contact.say('到了么，小可耐~');
    await contact.say('要注意安全哦~');
  });
}

module.exports = onLogin;
