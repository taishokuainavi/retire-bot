// 必要な道具を読み込む
const express = require('express');
const line = require('@line/bot-sdk');

// LINE Botの設定
const config = {
  channelAccessToken: 'HwwJ0QljuT/ePKGkIioxOOWeLFjlInWhh0zrT99fflKADRSlhUI6S5HNXxeJjKYXSduQske8a/Dx5KQDFAhLShvTlhCE5oT2460gaCM8jqFX+nSFuLRj0G0IiLWV4oxNp48Z4Y1gkfQO2v6H4j5/BwdB04t89/1O/w1cDnyilFU=',
  channelSecret: '8f2a91d1bd40658ac9deb4603ca9ab2e'
};

// LINEのミドルウェアとアプリの準備
const app = express();
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then(result => res.json(result));
});

// メッセージが来たときの処理
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: 'こんにちは！退職アシストBotです👋'
  });
}

// LINEクライアントを準備
const client = new line.Client(config);

// サーバーを立ち上げる
app.listen(3000, () => {
  console.log('リタイアBotがポート3000で起動中...');
});
