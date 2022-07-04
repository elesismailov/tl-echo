const TelegramBot = require('node-telegram-bot-api');

if (process.env.NODE_ENV === 'development') {
	require('dotenv').config();
}

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, {polling: true});

// ECHO
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  bot.sendMessage(chatId, resp);
  bot.sendMessage(chatId, 'from echo');
});

// INLINE MSG
bot.onText(/inline/, (msg, match) => {

  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Inline Message', {
		"parse_mode": "Markdown",
		reply_markup: {
			inline_keyboard: [
				[
					{
						text: 'Option A',
						callback_data: 'inline option a',
					},
					{
						text: 'Option B',
						callback_data: 'inline option b',
					},
					{
						text: 'Option C',
						callback_data: 'inline option c',
					},
				]
			],
		},
	});
});

// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;
//   bot.sendMessage(chatId, 'Received your message');
// });
