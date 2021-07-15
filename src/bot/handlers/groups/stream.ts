import { Composer } from "grammy";
import { escape } from "html-escaper";

import ffmpeg from "../../../ffmpeg";
import getFile from "../../getFile";
import getOnFinish from "../../getOnFinish";
import gramtgcalls from "../../../userbot/gramtgcalls";
import queues from "../../../queues";

const composer = new Composer();

export default composer;

composer.command("stream", async (ctx) => {
   const audio = ctx.message?.reply_to_message?.audio;
   const voice = ctx.message?.reply_to_message?.voice;

   let text, name, fileId;

   if (audio) {
      name = "an audio file";

      if (audio.performer && audio.title) {
         name = `${audio.performer} — ${audio.title}`;
      }

      fileId = audio.file_id;
   } else if (voice) {
      name = "a voice message";
      fileId = voice.file_id;
   }

   if (name && fileId && ctx.from) {
      if (gramtgcalls.finished(ctx.chat.id) != false) {
         await gramtgcalls.stream(
            ctx.chat.id,
            await ffmpeg(await getFile(fileId), fileId),
            {
               onFinish: getOnFinish(ctx.chat.id),
            }
         );

         text = `\u25b6\ufe0f <b>${escape(
            ctx.from.first_name
         )} is now streaming ${escape(name)}...</>`;
      } else {
         const position = queues.push(ctx.chat.id, {
            fileId,
         });

         text = `#\ufe0f\u20e3 <b>${escape(
            ctx.from.first_name
         )} queued ${escape(name)} at position ${position}...</>`;
      }

      await ctx.reply(text, {
         parse_mode: "HTML",
      });
      return;
   }

   await ctx.reply("<b>\u2753 What do you want to stream?</>", {
      parse_mode: "HTML",
   });
});
