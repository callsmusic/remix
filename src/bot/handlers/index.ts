import { Composer } from "grammy";

import controls from "./controls";
import end from "./end";
import now from "./now";
import panel from "./panel";
import playlist from "./playlist";
import shuffle from "./shuffle";
import stream from "./stream";

const composer = new Composer();

export default composer;

composer
    .filter((ctx) => Boolean(ctx.chat?.type.includes("group")))
    .use(controls)
    .use(end)
    .use(now)
    .use(panel)
    .use(playlist)
    .use(shuffle)
    .use(stream);
