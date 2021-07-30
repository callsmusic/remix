import { PassThrough } from "stream";

import fluent from "fluent-ffmpeg";
import { User, Message, Audio, Voice } from "@grammyjs/types";

import { getFile, getMessageUrl } from "../helpers";
import { stream } from "./base";

export default async (message: Message) => {
  const audio = (message.audio || message.voice) as Audio | Voice;

  return await stream(message.chat.id, {
    url: getMessageUrl(message),
    title:
      audio instanceof Audio ? audio.title || "Audio file" : "Voice message",
    requester: message.from as User,
    getReadable: async () =>
      fluent(await getFile(audio.file_id))
        .format("s16le")
        .audioChannels(1)
        .audioFrequency(65000)
        .pipe() as PassThrough,
  });
};
