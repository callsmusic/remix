import { Bot } from "grammy";
import env from "../env";
import i18n from "./i18n";

const bot = new Bot(env.BOT_TOKEN);

bot.api.config.use((prev, method, payload) => {
  return prev(method, {
    parse_mode: "HTML",
    ...payload,
  });
});

export default bot;
