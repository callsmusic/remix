import got from "got";
import env from "../../env";
import bot from "../bot";

export default async (fileId: string) => {
    return got.stream(
        `https://api.telegram.org/file/bot${env.BOT_TOKEN}/${
            (await bot.api.getFile(fileId)).file_path
        }`,
    );
};
