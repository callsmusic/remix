import { Composer } from "grammy";
import gramtgcalls from "../../userbot/gramtgcalls";
import queues from "../../queues";
import { stream } from "../streamer";
import i18n from "../i18n";

const composer = new Composer();

export default composer;

composer.command(["shuffle", "sh", "mix"], async (ctx) => {
    if (gramtgcalls(ctx.chat.id).pause() == null) {
        await ctx.reply(i18n("not_in_call"));
        return;
    }

    const result = queues.suffle(ctx.chat.id);

    if (result == false) {
        await ctx.reply(i18n("no_enough_items"));
        return;
    }

    await ctx.reply(i18n("shuffling"));
    await stream(ctx.chat.id, result, true);
    gramtgcalls(ctx.chat.id).resume();
});
