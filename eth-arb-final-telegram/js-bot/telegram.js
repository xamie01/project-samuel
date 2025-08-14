const TelegramBot = require('node-telegram-bot-api');
const cfg = require('./config');
const { runMonitorOnce } = require('./monitor');
const { sendFlashloan } = require('./executor');
let polling = null;
const botToken = cfg.TG_BOT_TOKEN;
if (!botToken) {
  console.log('Telegram token not set; run monitor normally with `npm run monitor`');
  process.exit(0);
}
const bot = new TelegramBot(botToken, { polling: true });
let mode = cfg.MODE;
let autoExecute = cfg.AUTO_EXECUTE;
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'ETH Arb Bot controller. Use /status, /setmode <mainnet|sepolia>, /auto <on|off>, /demo');
});
bot.onText(/\/status/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Mode: ${mode}\nAuto-execute: ${autoExecute}\nDry-run: ${cfg.DRY_RUN}\nProfit threshold: ${cfg.PROFIT_THRESHOLD}%`);
});
bot.onText(/\/setmode (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const m = match[1].toLowerCase();
  if (m !== 'mainnet' && m !== 'sepolia') { bot.sendMessage(chatId, 'Invalid mode'); return; }
  mode = m;
  bot.sendMessage(chatId, `Switched mode to ${mode}`);
});
bot.onText(/\/auto (on|off)/, (msg, match) => {
  const chatId = msg.chat.id;
  autoExecute = match[1] === 'on';
  bot.sendMessage(chatId, `Auto-execute ${autoExecute ? 'enabled' : 'disabled'}`);
});
bot.onText(/\/demo/, async (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Running demo single-pass (this may take a few seconds)...');
  try {
    await runMonitorOnce(mode);
    bot.sendMessage(chatId, 'Demo pass complete.');
  } catch (e) {
    bot.sendMessage(chatId, 'Demo error: '+e.message);
  }
});
bot.onText(/\/trade/, async (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Attempting manual execution (dry-run respects DRY_RUN setting)...');
  // For safety, demo will call sendFlashloan with placeholder values
  bot.sendMessage(chatId, 'Manual execute not implemented for arbitrary parameters. Use monitored alerts to auto-execute.');
});
console.log('Telegram bot running.');
