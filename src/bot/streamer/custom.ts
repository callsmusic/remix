import { PassThrough } from "stream";
import fluent from "fluent-ffmpeg";
import { User, Message } from "@grammyjs/types";
import { getMessageUrl } from "../helpers";
import { stream } from "./base";

export default async (input: string, message: Message) => {
    return await stream(message.chat.id, {
        url: getMessageUrl(message),
        title: "Custom Input",
        requester: message.from as User,
        getReadable: async () =>
            fluent(input)
                .format("s16le")
                .audioChannels(1)
                .audioFrequency(65000)
                .pipe() as PassThrough,
    });
};
