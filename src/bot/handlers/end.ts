import { Composer } from "grammy";
import { stop } from "../streamers";

const composer = new Composer();

export default composer;

composer.on(":voice_chat_ended", (ctx) => stop(ctx.chat.id));
