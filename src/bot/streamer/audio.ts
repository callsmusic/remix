import { PassThrough } from "stream";
import fluent from "fluent-ffmpeg";
import { User, Message } from "@grammyjs/types";
import { getFile, getMessageUrl } from "../helpers";
import { stream } from "./base";

export default async (message: Message) => {
    const chatId = message.chat.id,
        audio = message.audio || message.reply_to_message?.audio,
        voice = message.voice || message.reply_to_message?.voice,
        fileId = String((audio || voice)?.file_id);

    return await stream(chatId, {
        url: getMessageUrl(message),
        title: audio ? audio.title || "Audio file" : "Voice message",
        requester: message.from as User,
        getReadable: async () =>
            fluent(await getFile(fileId))
                .format("s16le")
                .audioChannels(1)
                .audioFrequency(65000)
                .pipe() as PassThrough,
    });
};
