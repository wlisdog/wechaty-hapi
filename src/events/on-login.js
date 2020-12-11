/**
 * @desc 登录初始化
 * @date 2020-12-10 14:15:34
 */
const { setSchedule } = require("../plugins/schedule");
const bot = require("../../index");

async function onLogin (user) {
  console.log(`${user.payload.name}你好啊~`)
  await onReplyMessage();
};

/**
 * @desc 定时打卡提醒
 */
const onReplyMessage = async () => {
  const timer = "0 0 18 * * *";
  setSchedule('everyDay', timer,  () => {
    remindPunchCard();
  });
}

/**
 * @desc 定义回复消息内容
 */
function getReplyMessage(){
  let date = new Date();
  let dateStr = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  let message = "晚上好，现在是北京时间" + dateStr + ",现在已经下班了，请不要忘记打卡。如果您已经打完卡请回复 打过卡了 。我会五分钟提醒一次直到您打完卡。";
  return message;
}

/**
 * @desc 回复消息
 */
async function sendReplyMessage(){
  let contact = await bot.bot.Contact.find({ name: 'Lex.' });
  let message = await getReplyMessage();
  await contact.say(message);
}



/**
 * @desc 五分钟提醒定时
 */
async function remindPunchCard(){
  const timer = "* */20 * * * *";
  setSchedule('fiveMins',timer,sendReplyMessage)
}


module.exports = onLogin;

