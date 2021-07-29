import { PassThrough } from "stream";
import { Audio, Voice } from "@grammyjs/types";
import fluent from "fluent-ffmpeg";
import ytdl from "ytdl-core-telegram";

import gramtgcalls from "../userbot/gramtgcalls";
import queues from "../queues";
import getFile from "./getFile";

export const getOnFinish = (chatId: number) => async () => {
  const item = queues.get(chatId);

  if (item) {
    await gramtgcalls.stream(chatId, await getReadable(item), {
      onFinish: getOnFinish(chatId),
    });
    return true;
  }

  return await gramtgcalls.stop(chatId);
};

export async function getReadable(videoOrFile: string | Voice | Audio) {
  return typeof videoOrFile == "string"
    ? ytdl.downloadFromInfo(await ytdl.getInfo(videoOrFile), {
        highWaterMark: 1 << 25,
      })
    : (fluent(await getFile(videoOrFile.file_id))
        .format("s16le")
        .audioChannels(1)
        .audioFrequency(65000)
        .pipe() as PassThrough);
}

export async function stream(
  chatId: number,
  videoOrFile: string | Voice | Audio
) {
  const finished = gramtgcalls.finished(chatId) != false;

  if (finished) {
    const readable = await getReadable(videoOrFile);

    await gramtgcalls.stream(chatId, readable, {
      onFinish: getOnFinish(chatId),
    });

    return null;
  } else {
    if (typeof videoOrFile === "string") {
      await ytdl.getBasicInfo(videoOrFile);
    }

    const position = queues.push(chatId, videoOrFile);
    return position;
  }
}
