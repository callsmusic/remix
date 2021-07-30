import ytdl from "ytdl-core-telegram";
import { User } from "@grammyjs/types";
import { stream } from "./base";

export default async (chatId: number, requester: User, id: string) => {
  const info = await ytdl.getInfo(id);
  const { title, video_url } = info.videoDetails;

  return await stream(chatId, {
    url: video_url,
    title,
    requester,
    getReadable: () => ytdl.downloadFromInfo(info),
  });
};
