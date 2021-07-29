import { Composer } from "grammy";
import { stream } from "../../stream";
import ytpl from "ytpl";

const composer = new Composer();

export default composer;

composer.command(["pl", "playlist"], async (ctx) => {
  const url =
    ctx.message?.reply_to_message?.text || ctx.message?.text.split(/\s/)[1];

  try {
    const playlist = await ytpl(url as string);

    for (let i in playlist.items) {
      const result = await stream(ctx.chat.id, playlist.items[i].url);

      if (i == "0") {
        await ctx.reply(
          result == null
            ? `▶️ | <b>Streaming and queuing ${playlist.items.length} items...</>`
            : `🎶 | <b>Queuing ${playlist.items.length} items...</>`
        );
      }
    }

    await ctx.reply(`✅ | <b>Queued all items.</>`);
  } catch (err) {
    await ctx.reply(`❌ | <b>An error occurred.</>`);
  }
});
