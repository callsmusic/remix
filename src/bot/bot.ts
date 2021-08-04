import { Bot } from "grammy";
import env from "../env";
import errors from "./errors";
import i18n from "./i18n";

const bot = new Bot(env.BOT_TOKEN);

bot.api.config.use((prev, method, payload) => {
    return prev(method, {
        parse_mode: "HTML",
        ...payload,
    });
});

bot.catch((errorAndContext) => {
    const { ctx, error } = errorAndContext;

    if (error instanceof Error) {
        let { message } = error;
        message = message.toLocaleLowerCase();

        for (let key in errors) {
            let [toInclude, toReply] = errors[key];
            toInclude = toInclude.toLocaleLowerCase();

            if (message.includes(toInclude)) {
                return ctx.reply(toReply);
            }
        }
    }

    return ctx.reply(i18n("error"));
});

export default bot;
