import ytdl from "ytdl-core";
import { Composer } from "grammy";
import i18n from "../i18n";
import { audio, custom, youtube } from "../streamer";

const composer = new Composer();

export default composer;

composer.command(["stream", "s", "play", "p"], async (ctx) => {
    const input =
        ctx.message?.reply_to_message?.audio ||
        ctx.message?.reply_to_message?.voice ||
        ctx.message?.reply_to_message?.text ||
        ctx.message?.text.split(/\s/)[1];

    const isCustomInput = typeof input === "string" && "custom".includes(input);
    const customInput = ctx.message?.text.split(/\s/)[2];

    if (!input || (isCustomInput && !customInput)) {
        await ctx.reply(i18n("no_input"));
        return;
    }

    const result =
        typeof input === "string"
            ? isCustomInput
                ? await custom(input, ctx.message!)
                : await youtube(ctx.chat.id, ctx.from!, input)
            : await audio(ctx.message?.reply_to_message!);

    if (result == null) {
        await ctx.reply(i18n("streaming"));
        return;
    }

    await ctx.reply(i18n("queued_at", { position: String(result) }));
});
