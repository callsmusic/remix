import { Composer } from "grammy";

import controls from "./controls";
import stream from "./stream";
import end from "./end";

const composer = new Composer();

export default composer;

composer
  .filter((ctx) => !!ctx.chat?.type.includes("group"))
  .use(controls)
  .use(stream)
  .use(end);
