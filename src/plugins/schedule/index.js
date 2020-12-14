/*
 * @Description:  定时任务
 * @Date: 2020-05-19 21:55:04
 */
const schedule = require('node-schedule');
const bot = require("../../../index");

//其他规则见 https://www.npmjs.com/package/node-schedule
// 规则参数讲解    *代表通配符
// *  *  *  *  *  *
// ┬ ┬ ┬ ┬ ┬ ┬
// │ │ │ │ │  |
// │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
// │ │ │ │ └───── month (1 - 12)
// │ │ │ └────────── day of month (1 - 31)
// │ │ └─────────────── hour (0 - 23)
// │ └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)
// 每分钟的第30秒触发： '30 * * * * *'
//
// 每小时的1分30秒触发 ：'30 1 * * * *'
//
// 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
//
// 每月的1日1点1分30秒触发 ：'30 1 1 1 * *'
//
// 每周1的1点1分30秒触发 ：'30 1 1 * * 1'

function setSchedule(name, date, callback) {
  schedule.scheduleJob(name, date, callback)
}

function cancelSchedule(name) {
  let myJob = schedule.scheduledJobs[name];
  myJob.cancel()
}

/**
 * @desc  定时打卡提醒
 * @param {String} timer       打卡时间 例: "0 0 18 * * *"
 * @param {Number} remindTime  间隔提醒时间 例: 5
 * @param {String} userName   用户微信名称 例: Lex.
 */
const onPunchCardRemind = async (timer, remindTime, userName, remindName) => {
  setSchedule('everyDay', timer,  () => {
    // 间隔提醒
    const remindTimer = `0 */${remindTime} * * * *`;
    let contact = await bot.bot.Contact.find({ name: userName });
    let message = await getReplyMessage(remindTime);
    await contact.say(message);

    setSchedule(remindName, remindTimer, async () => {
      let contact = await bot.bot.Contact.find({ name: userName });
      let message = await getReplyMessage(remindTime);
      await contact.say(message);
    })
  });
}

/**
 * @desc 定时打卡-定义回复消息内容
 */
async function getReplyMessage(remindTime) {
  let date = new Date();
  let dateStr = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  let message = "晚上好，现在是北京时间" + dateStr + ",现在已经下班了，请不要忘记打卡。如果您已经打完卡请回复 打过卡了 。我会每间隔" + remindTime + "分钟提醒一次直到您打完卡。";
  return message;
}

/**
 * @desc 回复打卡停止提醒
 * @param {Object} message    回复实例
 * @param {String} remindName 定时器名称 例: setInterlTime
 * @param {String} userName   用户微信名称 例: Lex.
 */
async function onStopRemind(message, remindName, userName) {
  let from = message.talker();
  let text = message.text();
  let fromName = await from.name();
  if(text === '打过卡了' && fromName === userName) {
    console.log('打过卡了')
    cancelSchedule(remindName);
    await message.say('好的，祝您工作愉快！');
  }
}

/**
 * @desc 小王上班定时~
 */
const onToWorkMyGirl = async () => {
  const timer = "0 20 9 * * *";
  setSchedule(timer, async () => {
    let contact = await bot.bot.Contact.find({ name: '小抽基' });
    await contact.say('到了么，小可耐~');
    await contact.say('要注意安全哦~');
  });
}

module.exports = {
  onStopRemind,
  onPunchCardRemind,
  onToWorkMyGirl
};
