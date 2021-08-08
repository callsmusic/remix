import ytpl from "ytpl";
import { Composer } from "grammy";
import { User } from "@grammyjs/types";
import env from "../../env";
import i18n from "../i18n";
import { youtube } from "../streamer";

const composer = new Composer();

export default composer;

composer.command(["playlist", "pl", "list"], async (ctx) => {
    const url =
        ctx.message?.reply_to_message?.text || ctx.message?.text.split(/\s/)[1];

    if (!url) {
        return;
    }

    const items = (
        await ytpl(url as string, {
            requestOptions: { headers: { Cookie: env.COOKIES } },
        })
    ).items.slice(0, env.MAX_PLAYLIST_SIZE);

    for (let i in items) {
        const result = await youtube(
            ctx.chat.id,
            ctx.from as User,
            items[i].url,
            items[i].title,
            items[i].url,
        );

        if (i == "0") {
            await ctx.reply(
                result == null
                    ? i18n("streaming_queuing", { X: String(items.length) })
                    : i18n("queuing", { X: String(items.length) }),
            );
        }
    }
});
