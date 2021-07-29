import queues from "../queues";
import gramtgcalls from "../userbot/gramtgcalls";
import { getReadable } from "./stream";

const getOnFinish = (chatId: number) => async () => {
  const item = queues.get(chatId);

  if (item) {
    await gramtgcalls.stream(chatId, await getReadable(item), {
      onFinish: getOnFinish(chatId),
    });
    return true;
  }

  return await gramtgcalls.stop(chatId);
};

export default getOnFinish;
