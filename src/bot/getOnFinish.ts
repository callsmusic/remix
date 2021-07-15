import ffmpeg from "../ffmpeg";
import queues from "../queues";
import gramtgcalls from "../userbot/gramtgcalls";
import getFile from "./getFile";

const getOnFinish = (chatId: number) => async () => {
   const item = queues.get(chatId);

   if (item) {
      await gramtgcalls.stream(
         chatId,
         await ffmpeg(await getFile(item.fileId), item.fileId),
         {
            onFinish: getOnFinish(chatId),
         }
      );
      return true;
   }

   return await gramtgcalls.stop(chatId);
};

export default getOnFinish;
