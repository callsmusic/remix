import { Bot } from "grammy";
import env from "../env";
import handlers from "./handlers";

const bot = new Bot(env.TOKEN);

bot.use(handlers);
bot.catch(console.error);

export default () => bot.start({ drop_pending_updates: true });
