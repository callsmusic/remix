import { Composer } from "grammy";

import controls from "./controls";
import end from "./end";
import playlist from "./playlist";
import stream from "./stream";
import ns from "./ns";

const composer = new Composer();

export default composer;

composer
  .filter((ctx) => Boolean(ctx.chat?.type.includes("group")))
  .use(stream)
  .use(playlist)
  .use(end)
  .use(controls)
  .use(ns);
