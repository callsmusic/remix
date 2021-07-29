import { Composer } from "grammy";
import { stream } from "../../stream";

const composer = new Composer();

export default composer;

composer.command(["s", "play", "stream"], async (ctx) => {
  const videoOrFile =
    ctx.message?.reply_to_message?.audio ||
    ctx.message?.reply_to_message?.voice ||
    ctx.message?.reply_to_message?.text ||
    ctx.message?.text.split(/\s/)[1];

  if (!videoOrFile) {
    await ctx.reply("❔ | <b>What do you want to stream?</>");
    return;
  }

  try {
    const result = await stream(ctx.chat.id, videoOrFile);

    if (result == null) {
      await ctx.reply("▶️ | <b>Streaming...</>");
      return;
    }

    await ctx.reply(`#️⃣ | <b>Queued at position ${result}.</>`);
  } catch (err) {
    const message = (err as Error).message;

    if (message.startsWith("No video id found:")) {
      await ctx.reply("❌ | <b>No video found.</>");
      return;
    }

    await ctx.reply(`❌ | <b>An error occurred.</>`);
  }
});
