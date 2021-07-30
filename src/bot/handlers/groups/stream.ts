import { Composer } from "grammy";
import { stream } from "../../stream";
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

  const result = await stream(ctx.chat.id, videoOrFile);

  if (result == null) {
    await ctx.reply(_("streaming"));
    return;
  }

  await ctx.reply(_("queued_at", { position: String(result) }));
});
