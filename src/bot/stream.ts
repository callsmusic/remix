import { PassThrough } from "stream";
import { Context } from "grammy";
import { Chat, Audio, Voice } from "@grammyjs/types";
import fluent from "fluent-ffmpeg";
import ytdl from "ytdl-core-telegram";

import gramtgcalls from "../userbot/gramtgcalls";
import queues from "../queues";
import getFile from "./getFile";

export async function getReadable(videoOrFile: string | Voice | Audio) {
  return typeof videoOrFile == "string"
    ? ytdl.downloadFromInfo(await ytdl.getInfo(videoOrFile))
    : (fluent(await getFile(videoOrFile.file_id))
        .format("s16le")
        .audioChannels(1)
        .audioFrequency(65000)
        .pipe() as PassThrough);
}

export async function stream(
  ctx: Context & {
    chat: Chat;
  },
  videoOrFile: string | Voice | Audio
) {
  const finished = gramtgcalls.finished(ctx.chat.id) != false;

  if (finished) {
    try {
      const readable = await getReadable(videoOrFile);

      await gramtgcalls.stream(ctx.chat.id, readable);
      await ctx.reply("▶️ | <b>Streaming...</>");
    } catch (err) {
      const message = (err as Error).message;

      if (message.startsWith("No video id found:")) {
        await ctx.reply("❌ | <b>No video found.</>");
        return;
      }

      await ctx.reply(`❌ | <b>An unexpected error occurred.</>`);
    }
  } else {
    if (typeof videoOrFile === "string") {
      try {
        await ytdl.getBasicInfo(videoOrFile);
      } catch (err) {
        await ctx.reply(`❌ | <b>Could not fetch that video.</>`);
        return;
      }
    }

    const position = queues.push(ctx.chat.id, videoOrFile);
    await ctx.reply(`#️⃣ | <b>Queued at position ${position}.</>`);
  }
}
