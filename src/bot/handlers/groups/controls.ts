import { Composer } from "grammy";

import gramtgcalls from "../../../userbot/gramtgcalls";
import queues from "../../../queues";
import getOnFinish from "../../getOnFinish";

const composer = new Composer();

export default composer;

const parse_mode = "HTML";
const notPlaying = "<b>\u274c Not playing</>";
const notInCall = "<b>\u274c Not in call</>";

composer.command("pause", (ctx) => {
   switch (gramtgcalls.pause(ctx.chat.id)) {
      case true:
         return ctx.reply("<b>\u23f8 Paused</>", { parse_mode });
      case false:
         return ctx.reply(notPlaying, { parse_mode });
      case null:
         return ctx.reply(notInCall, { parse_mode });
   }
});

composer.command("resume", (ctx) => {
   switch (gramtgcalls.resume(ctx.chat.id)) {
      case true:
         return ctx.reply("<b>\u25b6\ufe0f Resumed</>", { parse_mode });
      case false:
         return ctx.reply("<b>\u274c Not paused</>", { parse_mode });
      case null:
         return ctx.reply(notInCall, { parse_mode });
   }
});

composer.command("skip", async (ctx) => {
   switch (await getOnFinish(ctx.chat.id)()) {
      case true:
         return ctx.reply("<b>\u23e9 Skipped</>", { parse_mode });
      case false:
         return ctx.reply(notPlaying, { parse_mode });
      case null:
         return ctx.reply(notInCall, { parse_mode });
   }
});

composer.command("stop", async (ctx) => {
   switch (await gramtgcalls.stop(ctx.chat.id)) {
      case true:
         queues.clear(ctx.chat.id);
         return ctx.reply("<b>\u23f9 Stopped</>", { parse_mode });
      case false:
         return ctx.reply(notPlaying, { parse_mode });
      case null:
         return ctx.reply(notInCall, { parse_mode });
   }
});
