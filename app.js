const TelegramBot = require('node-telegram-bot-api');

if (process.env.NODE_ENV === 'development') {
	require('dotenv').config();
}

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Received your message');
});
