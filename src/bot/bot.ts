import { Bot } from "grammy";
import env from "../env";

const bot = new Bot(env.TOKEN);

bot.api.config.use((prev, method, payload) => {
  return prev(method, {
    parse_mode: "HTML",
    ...payload,
  });
});

export default bot;
