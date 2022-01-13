import lyricsSearcher from "lyrics-searcher";
import { Composer } from "../composer";
import { queues } from "../queues";
import { chunkSubstr } from "../helpers/text";
import { __ } from "../i18n";

const composer = new Composer();

export default composer;

composer.command(["ly", "lyrics"], async (ctx) => {
  const title = queues.getNow(ctx.chat.id)?.title;
  if (!title) {
    await ctx.reply(__("not_streaming"));
    return;
  }
  let lyrics;
  try {
    lyrics = await lyricsSearcher(title, "a");
  } catch (err) {
    await ctx.reply(__("lyrics_not_found"));
    return;
  }
  const chunks = chunkSubstr(__("lyrics", { lyrics, title }), 4096);
  for (const chunk of chunks) {
    await ctx.reply(chunk);
  }
});
