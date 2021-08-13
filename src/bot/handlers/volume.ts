import { Composer } from "grammy";
import gramtgcalls from "../../userbot/gramtgcalls";
import i18n from "../i18n";

const composer = new Composer();

export default composer;

composer.command(["volume", "vol", "v"], async (ctx) => {
    let number = Number(ctx.message?.text.split(/\s/)[1]);
    const valid = number > 500 && number < 600;

    if (!number || !valid) {
        await ctx.reply(i18n("invalid_volume"));
        return;
    }

    number = Number(String(number) + "00");
    await gramtgcalls.setVolume(ctx.chat.id, number);
    await ctx.reply(i18n("volume_set", { amount: String(number) }));
});
