import bot from "./bot";
import handlers from "./handlers";

bot.use(handlers);

export default () => bot.start({ drop_pending_updates: true });
