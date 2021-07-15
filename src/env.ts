import { config } from "dotenv";
import { cleanEnv, num, str } from "envalid";

config();

export default cleanEnv(process.env, {
   TOKEN: str(),
   STRING_SESSION: str(),
   API_ID: num(),
   API_HASH: str(),
});
