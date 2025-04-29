// api/index.js  （例：最新形）
const express = require('express');
const line = require('@line/bot-sdk');
const serverless = require('serverless-http');   // ← 重要

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret:     process.env.CHANNEL_SECRET,
};

const app = express();
app.use(express.json());

const client = new line.Client(config);

// GET /api/index へのヘルスチェック
app.get('/', (req, res) => {
  res.send('こんにちは！退職アシストBotです👋');
});

// Webhook
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
        .then(result => res.json(result))
        .catch(err => {
          console.error('❌ handleEvent error:', err);
          res.status(500).end();
        });
});

async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') return;

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: 'こんにちは！退職アシストBotです👋',
  });
}

// ローカル開発用: PORT=3000 で起動
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`リタイアBotがポート${PORT}で起動中...`)
  );
}

// Vercel 用エクスポート  ← これが無いと 500 になります
module.exports = serverless(app);