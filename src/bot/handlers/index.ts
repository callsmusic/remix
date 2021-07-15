import { Composer } from "grammy";

import groups from "./groups";

const composer = new Composer();

export default composer;

composer.use(groups);
