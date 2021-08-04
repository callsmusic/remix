import { Context } from "grammy";
import i18n from "../i18n";

export default (error: any, ctx: Context) => {
    if (error instanceof Error) {
        const message = error.message;

        if (message == "No active group call") {
            return ctx.reply(i18n("no_call"));
        } else if (message.startsWith("No video id found:")) {
            return ctx.reply(i18n("no_video_found"));
        } else if (message == "file is too big") {
            return ctx.reply(i18n("file_too_big"));
        }
    }

    return ctx.reply(i18n("error"));
};
