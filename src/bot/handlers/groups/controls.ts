import { Composer } from "grammy";

import gramtgcalls from "../../../userbot/gramtgcalls";
import queues from "../../../queues";
import { getOnFinish } from "../../stream";
import _ from "../../i18n";

const composer = new Composer();

export default composer;

composer.command(["p", "pause"], (ctx) => {
  switch (gramtgcalls.pause(ctx.chat.id)) {
    case true:
      return ctx.reply(_("paused"));
    case false:
      return ctx.reply(_("not_streaming"));
    case null:
      return ctx.reply(_("not_in_call"));
  }
});

composer.command(["r", "resume"], (ctx) => {
  switch (gramtgcalls.resume(ctx.chat.id)) {
    case true:
      return ctx.reply(_("resumed"));
    case false:
      return ctx.reply(_("not_paused"));
    case null:
      return ctx.reply(_("not_in_call"));
  }
});

composer.command(["skip", "next"], async (ctx) => {
  switch (await getOnFinish(ctx.chat.id)()) {
    case true:
      return ctx.reply(_("skipped"));
    case false:
      return ctx.reply(_("not_streaming"));
    case null:
      return ctx.reply(_("not_in_call"));
  }
});

composer.command("stop", async (ctx) => {
  switch (await gramtgcalls.stop(ctx.chat.id)) {
    case true:
      queues.clear(ctx.chat.id);
      return ctx.reply(_("stopped"));
    case false:
      return ctx.reply(_("not_streaming"));
    case null:
      return ctx.reply(_("not_in_call"));
  }
});
