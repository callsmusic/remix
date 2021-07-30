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

bot.catch((ctxAndError) => {
  const { ctx, error } = ctxAndError;

  if (error instanceof Error) {
    const message = error.message;

    if (message == "No active group call") {
      return ctx.reply(i18n("no_call"));
    } else if (message.startsWith("No video id found:")) {
      return ctx.reply(i18n("no_video_found"));
    }
  }
});

export default bot;
