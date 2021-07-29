import { Composer } from "grammy";
import ytpl from "ytpl";

import { stream } from "../../stream";
import env from "../../../env";

const composer = new Composer();

export default composer;

composer.command(["pl", "playlist"], async (ctx) => {
  const url =
    ctx.message?.reply_to_message?.text || ctx.message?.text.split(/\s/)[1];

  try {
    const items = (await ytpl(url as string)).items.slice(
      0,
      env.MAX_PLAYLIST_SIZE
    );

    for (let i in items) {
      const result = await stream(ctx.chat.id, items[i].url);

      if (i == "0") {
        await ctx.reply(
          result == null
            ? `▶️ | <b>Streaming and queuing ${items.length} items...</>`
            : `🎶 | <b>Queuing ${items.length} items...</>`
        );
      }
    }
  } catch (err) {
    await ctx.reply(`❌ | <b>An error occurred.</>`);
  }
});
