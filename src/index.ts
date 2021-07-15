import bot from "./bot";
import userbot from "./userbot";

Promise.all([userbot(), bot()]);
