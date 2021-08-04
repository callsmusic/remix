import { Composer } from "grammy";
import { User, Message } from "@grammyjs/types";
import i18n from "../i18n";
import { audio, youtube } from "../streamer";

const composer = new Composer();

export default composer;

composer.command(["stream", "s", "play", "p"], async (ctx) => {
    const videoOrFile =
        ctx.message?.reply_to_message?.audio ||
        ctx.message?.reply_to_message?.voice ||
        ctx.message?.reply_to_message?.text ||
        ctx.message?.text.split(/\s/)[1];

    if (!videoOrFile) {
        await ctx.reply(i18n("no_input"));
        return;
    }

    const result =
        typeof videoOrFile === "string"
            ? await youtube(ctx.chat.id, ctx.from as User, videoOrFile)
            : await audio(ctx.message?.reply_to_message as Message);

    if (result == null) {
        await ctx.reply(i18n("streaming"));
        return;
    }

    await ctx.reply(i18n("queued_at", { position: String(result) }));
});
