import { Composer } from "grammy";

import ffmpeg from "../../../ffmpeg";
import getFile from "../../getFile";
import getOnFinish from "../../getOnFinish";
import gramtgcalls from "../../../userbot/gramtgcalls";
import queues from "../../../queues";

const composer = new Composer();

export default composer;

composer.command("stream", async (ctx) => {
  const audioOrVoice =
    ctx.message?.reply_to_message?.audio ||
    ctx.message?.reply_to_message?.voice;
  let text;

  if (audioOrVoice && ctx.from) {
    if (gramtgcalls.finished(ctx.chat.id) != false) {
      await gramtgcalls.stream(
        ctx.chat.id,
        await ffmpeg(await getFile(audioOrVoice.file_id), audioOrVoice.file_id),
        {
          onFinish: getOnFinish(ctx.chat.id),
        }
      );

      text = `\u25b6\ufe0f | <b>Streaming...</>`;
    } else {
      const position = queues.push(ctx.chat.id, {
        fileId: audioOrVoice.file_id,
      });

      text = `#\ufe0f\u20e3 | <b>Queued at position ${position}.</>`;
    }

    await ctx.reply(text, {
      parse_mode: "HTML",
    });
    return;
  }

  await ctx.reply("\u2753 | <b>What do you want to stream?</>", {
    parse_mode: "HTML",
  });
});
