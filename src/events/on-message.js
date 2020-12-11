const { onStopRemind } = require("../plugins/schedule");
const request = require("request");
const fs = require("fs");
const path = require('path');
const dir = path.join(__dirname + '/../images');

const onMessage = async (message) => {
  if (message.self()) return;
  await onMessageInit(message)
};

/**
 * @param 初始化对话函数 
 */
async function onMessageInit(message) {
  await onStopRemind(message, 'toLexInterval', 'Lex.');
  await onEmojiToImage(message);
}

/**
 * @desc 表情包转换图片路径
 */
async function onEmojiToImage(message) {
  let return_text = message.text().replace(/\s/g,"").replace(/&amp;/g, "&");
  let url;
  if (return_text.indexOf('emoji') > -1) {
    url = return_text.split('cdnurl=')[1].split('designerid')[0];
    url = url.substring(1, url.length - 2);
    if (url.indexOf('emoji') > -1) {
      await message.say(url);
    } else {
      let timestamp = new Date().getTime();
      request(url).pipe(fs.createWriteStream(`${dir}/${timestamp}.jpg`));
      await message.say(`api.yangdagang.com/src/images/${timestamp}.jpg`);
    }
  }
}

module.exports = onMessage;
