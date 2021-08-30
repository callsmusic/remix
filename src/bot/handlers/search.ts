import { Composer } from "grammy";
import ytsr from "ytsr";
import { Item } from "ytsr";
import env from "../../env";
import { humanize } from "../helpers";
import i18n from "../i18n";

const composer = new Composer();

export default composer;

const searches = new Map<number, (Item & { type: "video" })[]>();
const emojis = new Map([
    [1, "1️⃣"],
    [2, "2️⃣"],
    [3, "3️⃣"],
    [4, "4️⃣"],
    [5, "5️⃣"],
    [6, "6️⃣"],
    [7, "7️⃣"],
    [8, "8️⃣"],
    [9, "9️⃣"],
    [10, "🔟"],
]);

const truncate = (string: string, number = 70) => {
    return string.substr(0, number - 1) + (string.length > number ? "..." : "");
};

composer.command(["search", "find"], async (ctx) => {
    if (searches.has(ctx.chat.id)) {
        await ctx.reply(i18n("search_active"));
        return;
    }

    const query = ctx.message?.text.split(" ").slice(1).join(" ");

    if (!query) {
        await ctx.reply(i18n("no_query"));
        return;
    }

    const results = (
        await ytsr(query, {
            limit: 10,
            requestOptions: { headers: { Cookie: env.COOKIES } },
        })
    ).items.filter((v) => v.type == "video") as (Item & { type: "video" })[];

    if (!results) {
        await ctx.reply(i18n("no_results_found"));
        return;
    }

    const footer =
        "\n\n<i>Reply the number of the result you want to stream or /cancel.</>";

    let text = "";

    text += i18n("search_header", { query }) + "\n\n";

    for (let i = 0; i < results.length; i++) {
        const result = results[i];

        text +=
            i18n("search_result", {
                numberEmoji: emojis.get(i + 1)!,
                title: truncate(result.title),
                url: result.url,
                durationEmoji: result.isLive ? "🔴" : "🕓",
                duration: result.isLive ? "Live" : result.duration || "N/A",
                views: result.views ? humanize(result.views) : "N/A",
                uploadTime: result.uploadedAt || "N/A",
                uploader: result.author?.name || "N/A",
            }) + "\n\n";
    }

    text += i18n("search_footer");
    searches.set(ctx.chat.id, results);
    await ctx.reply(text, { disable_web_page_preview: true });
});

composer.command("cancel", (ctx) => {
    if (searches.get(ctx.chat.id)) {
        searches.delete(ctx.chat.id);
        return ctx.reply(i18n("search_canceled"));
    }

    return ctx.reply(i18n("search_not_active"));
});
