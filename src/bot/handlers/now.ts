import { Composer } from "grammy";
import { escape } from "html-escaper";
import i18n from "../i18n";
import queues from "../../queues";

const composer = new Composer();

export default composer;

composer.command(["now", "ns", "cs", "np", "cp"], (ctx) => {
    const now = queues.getNow(ctx.chat.id);

    if (now) {
        const { title, url, requester } = now;

        return ctx.reply(
            i18n("ns", {
                title: `<a href="${url}">${escape(title)}</>`,
                requester: `<a href="tg://user?id=${requester.id}">${requester.first_name}</>`,
            }),
        );
    }

    return ctx.reply(i18n("not_streaming"));
});
