const onMessage = async (message) => {
  if (message.self()) return;
  // 获取对话用户信息
  const contact = message.talker();
  let return_text = message.text().replace(/\s/g,"").replace(/&amp;/g, "&")
  let url;

  // 表情包返回图片流程
  if (return_text.indexOf('emoji') > -1) {
    url = return_text.split('cdnurl=')[1].split('designerid')[0]
    await message.say(url)
  }
};
module.exports = onMessage;
