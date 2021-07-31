import { Composer } from "grammy";

import controls from "./controls";
import end from "./end";
import ns from "./ns";
import playlist from "./playlist";
import stream from "./stream";

const composer = new Composer();

export default composer;

composer
    .filter((ctx) => Boolean(ctx.chat?.type.includes("group")))
    .use(controls)
    .use(end)
    .use(ns)
    .use(playlist)
    .use(stream);
