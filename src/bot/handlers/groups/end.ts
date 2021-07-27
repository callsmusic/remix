import { Composer } from "grammy";
import queues from "../../../queues";
import gramtgcalls from "../../../userbot/gramtgcalls";

const composer = new Composer();

composer.on(":voice_chat_ended", (ctx) => {
  queues.clear(ctx.chat.id);
  return gramtgcalls.stop(ctx.chat.id);
});

export default composer;
