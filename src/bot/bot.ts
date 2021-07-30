import { Bot } from "grammy";
import env from "../env";
import _ from "./i18n";

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
      return ctx.reply(_("no_call"));
    } else if (message.startsWith("No video id found:")) {
      return ctx.reply(_("no_video_found"));
    }
  }
});

export default bot;
