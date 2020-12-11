const { setSchedule, cancelSchedule } = require("../plugins/schedule");
const request = require("request");
const fs = require("fs");
var path = require('path');
var dir = path.join(__dirname + '/../images');

const onMessage = async (message) => {
  if (message.self()) return;
  // 获取对话用户信息
  const contact = message.talker();
  let return_text = message.text().replace(/\s/g,"").replace(/&amp;/g, "&");
  let url;
  console.log(return_text)
  await onStopMessage(message)
  // 表情包返回图片流程
  if (return_text.indexOf('emoji') > -1) {
    url = return_text.split('cdnurl=')[1].split('designerid')[0];
    url = url.substring(1, url.length - 2);

    if (url.indexOf('emoji') > -1) {
      await message.say(url)
    } else {
      let timestamp = new Date().getTime();
      request(url).pipe(fs.createWriteStream(`${dir}/${timestamp}.jpg`));
      await message.say(`api.yangdagang.com/src/images/${timestamp}.jpg`);
    }
  }
};
/**
 * @desc 回复停止提醒
 */
async function onStopMessage(message){
  let from = message.talker();
  let text = message.text();
  let fromName = await from.name();
  console.log(fromName)
  if(text === '打过卡了' && fromName === 'Lex.'){
    cancelSchedule("fiveMins");
    await message.say('好的，祝您工作愉快！');
  }

}
module.exports = onMessage;
