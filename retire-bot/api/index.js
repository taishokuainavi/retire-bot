const express = require('express');
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const app = express();

// ここを追加！！（ブラウザからアクセスされたとき用）
app.get('/', (req, res) => {
  res.send('こんにちは！退職アシストBotです👋');
});

// LINE Webhook受け取り
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

// メッセージ処理
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: 'こんにちは！退職アシストBotです👋'
  });
}

// LINE Client設定
const client = new line.Client(config);

// 必ずこの行を書く（Vercel用）
module.exports = app;