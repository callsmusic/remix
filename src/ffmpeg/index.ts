import path from "path/posix";
import { Readable } from "stream";
import { createHash } from "crypto";
import { createReadStream, existsSync, mkdirSync } from "fs";
import { spawn } from "child_process";

if (!existsSync("r")) {
   mkdirSync("r");
}

const getArgs = (input: string, output: string) =>
   (
      "-y " +
      `-i ${input} ` +
      "-c copy " +
      "-acodec pcm_s16le " +
      "-f s16le " +
      "-ac 1 " +
      "-ar 65000 " +
      output
   ).split(/\s/);

const getOutput = (identifier: string) =>
   path.join("r", "cmr" + createHash("md5").update(identifier).digest("hex"));

export const outputExists = (identifier: string) =>
   existsSync(getOutput(identifier));

export default (input: string, identifier: string): Promise<Readable> =>
   new Promise((resolve, reject) => {
      const output = getOutput(identifier);

      if (outputExists(identifier)) {
         resolve(createReadStream(output));
         return;
      }

      const process = spawn("ffmpeg", getArgs(input, output));

      process.on("exit", (code) => {
         if (code != 0) {
            reject(new Error(`Got a non-zero return code: ${code}`));
            return;
         }

         resolve(createReadStream(output));
      });
   });
