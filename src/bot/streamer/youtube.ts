import { videoInfo } from "ytdl-core";
import ytdl from "ytdl-core-telegram";
import { User } from "@grammyjs/types";
import env from "../../env";
import { stream } from "./base";

export const requestOptions = { Headers: { Cookie: env.COOKIES } };

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
            requestOptions,
        });
        title = info.videoDetails.title;
        url = info.videoDetails.video_url;
    }

    return await stream(chatId, {
        url,
        title,
        requester,
        getReadable: () =>
            info
                ? ytdl.downloadFromInfo(info, { requestOptions })
                : ytdl(id, { requestOptions }),
    });
};
