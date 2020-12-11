const onMessage = async (message) => {
  if (message.self()) return;
  // 获取对话用户信息
  const contact = message.talker();
  // console.log(contact)
  let return_text = message.text().replace(/\s/g,"").replace(/&amp;/g, "&");
  let url;
  console.log(return_text)
  if (return_text.indexOf('emoji') > -1) {
    url = return_text.split('cdnurl=')[1].split('designerid')[0]
    await message.say(url.replace("amp;",""))
  }
};
module.exports = onMessage;
