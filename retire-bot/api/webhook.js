// api/webhook.js
const line = require('@line/bot-sdk');

/* Vercel の環境変数 (Settings → Environment Variables) で登録する２つ */
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret:      process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);

/** ------------------------------------------------------------
 * Vercel serverless function エントリポイント
 * ------------------------------------------------------------ */
module.exports = async (req, res) => {
  // LINE 署名検証 (失敗すると 401 を返す)
  const middleware = line.middleware(config);
  await new Promise((resolve, reject) => {
    middleware(req, res, (err) => (err ? reject(err) : resolve()));
  }).catch(() => {
    res.status(401).send('signature validation failed');
  });

  // イベント処理
  const events = req.body.events || [];
  const results = await Promise.all(events.map(handleEvent));
  res.json(results);
};

/** ------------------------------------------------------------
 * 個々のイベントを処理
 * ------------------------------------------------------------ */
function handleEvent (event) {
  // テキスト以外は無視
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  // 返信
  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: 'こんにちは！退職アシストBotです 🤖',
  });
}