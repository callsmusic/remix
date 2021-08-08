import { config } from "dotenv";
import { cleanEnv, num, str } from "envalid";

config();

export default cleanEnv(process.env, {
    BOT_TOKEN: str(),
    STRING_SESSION: str(),
    API_ID: num(),
    API_HASH: str(),
    LOCALE: str({ default: "en" }),
    MAX_PLAYLIST_SIZE: num({ default: 10 }),
    COOKIES: str({ default: "" }),
});
