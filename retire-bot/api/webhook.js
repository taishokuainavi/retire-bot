// api/webhook.js
const express = require('express');
const { json } = require('body-parser');
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret:       process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);
const app = express();

app.use(json());

// LINEがPOSTしてくるイベントをここで受ける
app.post('/api/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then(results => res.json(results));
});

// メッセージイベントだけを返信する例
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }
  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: 'こんにちは！退職アシストBotです🤖',
  });
}

module.exports = app;