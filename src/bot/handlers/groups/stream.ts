import { Composer } from "grammy";
import { stream } from "../../stream";

const composer = new Composer();

export default composer;

composer.command(["s", "play", "stream"], async (ctx) => {
  const video =
    ctx.message?.reply_to_message?.text || ctx.message?.text.split(/\s/)[1];
  const file =
    ctx.message?.reply_to_message?.audio ||
    ctx.message?.reply_to_message?.voice;

  if (video) {
    await stream(ctx, video);
  } else if (file) {
    await stream(ctx, file);
  } else {
    await ctx.reply("❔ | <b>What do you want to stream?</>");
  }
});
