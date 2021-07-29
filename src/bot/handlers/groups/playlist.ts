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

    let i = 0;

    for (let i in playlist.items) {
      await stream(ctx.chat.id, playlist.items[i].url);
      i += 1;
    }

    await ctx.reply(`🎶 | <b>Queued ${i} items.</>`);
  } catch (err) {
    await ctx.reply(`❌ | <b>An error occurred.</>`);
  }
});
