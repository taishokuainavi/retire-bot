const express = require('express');
const line = require('@line/bot-sdk');
const serverless = require('serverless-http'); // ← これを追加！！

const app = express();

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);

// ここでGETリクエスト（ブラウザアクセス用）
app.get('/', (req, res) => {
  res.send('こんにちは！退職アシストBotです👋');
});

// Webhookエンドポイント
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: 'こんにちは！退職アシストBotです👋'
  });
}

// 👇最後にこの形式にするのがVercelでは超重要！！
module.exports = app;
module.exports.handler = serverless(app);
