import { Composer } from "grammy";

import gramtgcalls from "../../../userbot/gramtgcalls";
import queues from "../../../queues";
import { getOnFinish } from "../../stream";

const composer = new Composer();

export default composer;

const notPlaying = "❌ | <b>Not playing.</>";
const notInCall = "❌ | <b>Not in call.</>";

composer.command(["p", "pause"], (ctx) => {
  switch (gramtgcalls.pause(ctx.chat.id)) {
    case true:
      return ctx.reply("⏸ | <b>Paused.</>");
    case false:
      return ctx.reply(notPlaying);
    case null:
      return ctx.reply(notInCall);
  }
});

composer.command(["r", "resume"], (ctx) => {
  switch (gramtgcalls.resume(ctx.chat.id)) {
    case true:
      return ctx.reply("▶️ | <b>Resumed.</>");
    case false:
      return ctx.reply("❌ | <b>Not paused.</>");
    case null:
      return ctx.reply(notInCall);
  }
});

composer.command(["skip", "next"], async (ctx) => {
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
