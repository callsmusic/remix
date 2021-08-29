import { Composer } from "grammy";
import gramtgcalls from "../../userbot/gramtgcalls";
import i18n from "../i18n";
import { stop, getOnFinish } from "../streamer";

const composer = new Composer();

export default composer;

composer.command("pause", (ctx) => {
    switch (gramtgcalls(ctx.chat.id).pause()) {
        case true:
            return ctx.reply(i18n("paused"));
        case false:
            return ctx.reply(i18n("not_streaming"));
        case null:
            return ctx.reply(i18n("not_in_call"));
    }
});

composer.command(["resume", "re", "res", "continue"], (ctx) => {
    switch (gramtgcalls(ctx.chat.id).resume()) {
        case true:
            return ctx.reply(i18n("resumed"));
        case false:
            return ctx.reply(i18n("not_paused"));
        case null:
            return ctx.reply(i18n("not_in_call"));
    }
});

composer.command(["skip", "next"], async (ctx) => {
    switch (await getOnFinish(ctx.chat.id)()) {
        case true:
            return ctx.reply(i18n("skipped"));
        case false:
            return ctx.reply(i18n("not_streaming"));
        case null:
            return ctx.reply(i18n("not_in_call"));
    }
});

composer.command(["leave", "stop"], async (ctx) => {
    switch (await stop(ctx.chat.id)) {
        case true:
            return ctx.reply(i18n("stopped"));
        case false:
            return ctx.reply(i18n("not_streaming"));
        case null:
            return ctx.reply(i18n("not_in_call"));
    }
});

composer.command(["volume", "vol", "v"], async (ctx) => {
    const number = Number(ctx.message?.text.split(/\s/)[1]);
    const valid = number >= 0 && number <= 200;

    if (!valid) {
        await ctx.reply(i18n("invalid_volume"));
        return;
    }

    const volume = Math.round(number * 100) || 1;

    if (await gramtgcalls(ctx.chat.id).editSelf({ volume })) {
        await ctx.reply(i18n("volume_set", { amount: String(number) }));
        return;
    }

    await ctx.reply(i18n("not_in_call"));
});

composer.command(["mute", "m"], async (ctx) => {
    switch (gramtgcalls(ctx.chat.id).mute()) {
        case true:
            return ctx.reply(i18n("muted"));
        case false:
            return ctx.reply(i18n("already_muted"));
        case null:
            return ctx.reply(i18n("not_in_call"));
    }
});

composer.command(["unmute", "um"], async (ctx) => {
    switch (gramtgcalls(ctx.chat.id).unmute()) {
        case true:
            return ctx.reply(i18n("unmuted"));
        case false:
            return ctx.reply(i18n("not_muted"));
        case null:
            return ctx.reply(i18n("not_in_call"));
    }
});
