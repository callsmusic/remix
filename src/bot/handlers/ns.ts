import { Composer } from "grammy";
import { User, Message } from "@grammyjs/types";
import { escape } from "html-escaper";

import queues from "../../queues";
import i18n from "../i18n";

const composer = new Composer();

export default composer;

composer.command(["ns", "np", "cs", "cp"], (ctx) => {
  const now = queues.getNow(ctx.chat.id);

  if (now) {
    const { title, url, requester } = now;

    return ctx.reply(
      i18n("ns", {
        title: `<a href="${url}">${escape(title)}</>`,
        requester: `<a href="tg://user?id=${requester.id}">${requester.first_name}</>`,
      })
    );
  }

  return ctx.reply(i18n("not_streaming"));
});
