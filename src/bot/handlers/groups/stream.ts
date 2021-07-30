import { Composer } from "grammy";
import { User, Message } from "@grammyjs/types";

import { audio, youtube } from "../../streamers";
import _ from "../../i18n";

const composer = new Composer();

export default composer;

composer.command(["s", "play", "stream"], async (ctx) => {
  const videoOrFile =
    ctx.message?.reply_to_message?.audio ||
    ctx.message?.reply_to_message?.voice ||
    ctx.message?.reply_to_message?.text ||
    ctx.message?.text.split(/\s/)[1];

  if (!videoOrFile) {
    await ctx.reply(_("no_input"));
    return;
  }

  const result =
    typeof videoOrFile === "string"
      ? await youtube(ctx.chat.id, ctx.from as User, videoOrFile)
      : await audio(ctx.message?.reply_to_message as Message);

  if (result == null) {
    await ctx.reply(_("streaming"));
    return;
  }

  await ctx.reply(_("queued_at", { position: String(result) }));
});
