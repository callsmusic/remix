import { videoInfo } from "ytdl-core";
import ytdl from "ytdl-core-telegram";
import { User } from "@grammyjs/types";
import env from "../../env";
import { stream } from "./base";

export default async (
    chatId: number,
    requester: User,
    id: string,
    title?: string,
    url?: string,
) => {
    let info: videoInfo;

    if (!title || !url) {
        info = await ytdl.getInfo(id, {
            requestOptions: { Headers: { Cookie: env.COOKIES } },
        });
        title = info.videoDetails.title;
        url = info.videoDetails.video_url;
    }

    return await stream(chatId, {
        url,
        title,
        requester,
        getReadable: () => (info ? ytdl.downloadFromInfo(info) : ytdl(id)),
    });
};
