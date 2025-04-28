const express = require('express');
const serverless = require('serverless-http');

const app = express();
app.use(express.json());

// Health-check endpoint
app.get('/', (req, res) => {
  res.send('こんにちは！退職アシストBotです👋');
});

// Local development server (ignored on Vercel)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`リタイアBotがポート${PORT}で起動中...`);
  });
}

module.exports = serverless(app);