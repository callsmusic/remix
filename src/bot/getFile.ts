import env from "../env";
import { outputExists } from "../ffmpeg";
import bot from "./bot";

export default async (fileId: string) => {
   let input = "";

   if (!outputExists(fileId)) {
      const filePath = (await bot.api.getFile(fileId)).file_path;
      input = `https://api.telegram.org/file/bot${env.TOKEN}/${filePath}`;
   }

   return input;
};
