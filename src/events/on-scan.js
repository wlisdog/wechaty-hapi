const QrcodeTerminal = require('qrcode-terminal');
const { ScanStatus } = require('wechaty-puppet');

const onScan = async (qrcode, status) => {
  if (status === ScanStatus.Waiting) {
    QrcodeTerminal.generate(qrcode, {
      small: true
    })
  }
};

module.exports = onScan;
