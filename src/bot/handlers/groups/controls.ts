import { Composer } from "grammy";

import gramtgcalls from "../../../userbot/gramtgcalls";
import queues from "../../../queues";
import getOnFinish from "../../getOnFinish";

const composer = new Composer();

export default composer;

const notPlaying = "❌ | <b>Not playing.</>";
const notInCall = "❌ | <b>Not in call.</>";

composer.command("pause", (ctx) => {
  switch (gramtgcalls.pause(ctx.chat.id)) {
    case true:
      return ctx.reply("⏸ | <b>Paused.</>");
    case false:
      return ctx.reply(notPlaying);
    case null:
      return ctx.reply(notInCall);
  }
});

composer.command("resume", (ctx) => {
  switch (gramtgcalls.resume(ctx.chat.id)) {
    case true:
      return ctx.reply("▶️ | <b>Resumed.</>");
    case false:
      return ctx.reply("❌ | <b>Not paused.</>");
    case null:
      return ctx.reply(notInCall);
  }
});

composer.command("skip", async (ctx) => {
  switch (await getOnFinish(ctx.chat.id)()) {
    case true:
      return ctx.reply("⏩ | <b>Skipped.</>");
    case false:
      return ctx.reply(notPlaying);
    case null:
      return ctx.reply(notInCall);
  }
});

composer.command("stop", async (ctx) => {
  switch (await gramtgcalls.stop(ctx.chat.id)) {
    case true:
      queues.clear(ctx.chat.id);
      return ctx.reply("⏹ | <b>Stopped.</>");
    case false:
      return ctx.reply(notPlaying);
    case null:
      return ctx.reply(notInCall);
  }
});
