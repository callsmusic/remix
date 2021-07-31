import { Composer } from "grammy";
import gramtgcalls from "../../userbot/gramtgcalls";
import i18n from "../i18n";
import { stop, getOnFinish } from "../streamer";

const composer = new Composer();

export default composer;

composer.command(["p", "pause"], (ctx) => {
    switch (gramtgcalls.pause(ctx.chat.id)) {
        case true:
            return ctx.reply(i18n("paused"));
        case false:
            return ctx.reply(i18n("not_streaming"));
        case null:
            return ctx.reply(i18n("not_in_call"));
    }
});

composer.command(["r", "resume"], (ctx) => {
    switch (gramtgcalls.resume(ctx.chat.id)) {
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

composer.command("stop", async (ctx) => {
    switch (await stop(ctx.chat.id)) {
        case true:
            return ctx.reply(i18n("stopped"));
        case false:
            return ctx.reply(i18n("not_streaming"));
        case null:
            return ctx.reply(i18n("not_in_call"));
    }
});
