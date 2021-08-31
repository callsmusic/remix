import { Bot } from "grammy";
import { limit } from "@grammyjs/ratelimiter";
import env from "../env";
import errors from "./errors";
import i18n from "./i18n";

const bot = new Bot(env.BOT_TOKEN);

const isSafe = (s: string) => {
    return !s.includes(bot.token);
};

bot.use(limit({ timeFrame: 5000 }));

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

        if (isSafe(error.message)) {
            return ctx.reply(
                i18n("error_with_message", { message: error.message }),
            );
        }
    }

    return ctx.reply(i18n("error"));
});

export default bot;
