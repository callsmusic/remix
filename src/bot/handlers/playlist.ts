import ytpl from "ytpl";
import { Composer } from "grammy";
import { User } from "@grammyjs/types";

import { youtube } from "../streamers";
import env from "../../env";
import i18n from "../i18n";

const composer = new Composer();

export default composer;

composer.command(["pl", "playlist"], async (ctx) => {
  const url =
    ctx.message?.reply_to_message?.text || ctx.message?.text.split(/\s/)[1];

  const items = (await ytpl(url as string)).items.slice(
    0,
    env.MAX_PLAYLIST_SIZE
  );

  for (let i in items) {
    const result = await youtube(ctx.chat.id, ctx.from as User, items[i].url);

    if (i == "0") {
      await ctx.reply(
        result == null
          ? i18n("streaming_queuing", { items: String(items.length) })
          : i18n("queuing", { items: String(items.length) })
      );
    }
  }
});
