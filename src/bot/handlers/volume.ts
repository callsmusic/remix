import { Composer } from "grammy";
import gramtgcalls from "../../userbot/gramtgcalls";
import i18n from "../i18n";

const composer = new Composer();

export default composer;

composer.command(["volume", "vol", "v"], async (ctx) => {
    const number = Number(ctx.message?.text.split(/\s/)[1]);
    const valid = number >= 0 && number <= 200;

    if (!valid) {
        await ctx.reply(i18n("invalid_volume"));
        return;
    }

    const volume = Math.round(number * 100) || 1;

    if (await gramtgcalls.setVolume(ctx.chat.id, volume)) {
        await ctx.reply(i18n("volume_set", { amount: String(number) }));
        return;
    }

    await ctx.reply(i18n("not_in_call"));
});
