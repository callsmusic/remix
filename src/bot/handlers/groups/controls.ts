import { Composer } from "grammy";

import gramtgcalls from "../../../userbot/gramtgcalls";
import queues from "../../../queues";
import getOnFinish from "../../getOnFinish";

const composer = new Composer();

export default composer;

const parse_mode = "HTML";
const notPlaying = "\u274c | <b>Not playing</>";
const notInCall = "\u274c | <b>Not in call</>";

composer.command("pause", (ctx) => {
  switch (gramtgcalls.pause(ctx.chat.id)) {
    case true:
      return ctx.reply("\u23f8 | <b>Paused</>", { parse_mode });
    case false:
      return ctx.reply(notPlaying, { parse_mode });
    case null:
      return ctx.reply(notInCall, { parse_mode });
  }
});

composer.command("resume", (ctx) => {
  switch (gramtgcalls.resume(ctx.chat.id)) {
    case true:
      return ctx.reply("\u25b6\ufe0f | <b>Resumed</>", { parse_mode });
    case false:
      return ctx.reply("\u274c | <b>Not paused</>", { parse_mode });
    case null:
      return ctx.reply(notInCall, { parse_mode });
  }
});

composer.command("skip", async (ctx) => {
  switch (await getOnFinish(ctx.chat.id)()) {
    case true:
      return ctx.reply("\u23e9 | <b>Skipped</>", { parse_mode });
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
      return ctx.reply("\u23f9 | <b>Stopped</>", { parse_mode });
    case false:
      return ctx.reply(notPlaying, { parse_mode });
    case null:
      return ctx.reply(notInCall, { parse_mode });
  }
});
