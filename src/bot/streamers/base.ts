import gramtgcalls from "../../userbot/gramtgcalls";
import queues from "../../queues";
import { Item } from "../../queues";

export const getOnFinish = (chatId: number) => async () => {
  const item = queues.get(chatId);

  if (item) {
    await stream(chatId, item);
    return true;
  }

  queues.rmNow(chatId);
  return await gramtgcalls.stop(chatId);
};

export function stop(chatId: number) {
  queues.clear(chatId);
  return gramtgcalls.stop(chatId);
}

export async function stream(chatId: number, item: Item) {
  const finished = gramtgcalls.finished(chatId) != false;

  if (finished) {
    const getReadableResult = item.getReadable();

    const readable =
      getReadableResult instanceof Promise
        ? await getReadableResult
        : getReadableResult;

    await gramtgcalls.stream(chatId, readable, {
      onFinish: getOnFinish(chatId),
    });

    queues.setNow(chatId, item);

    return null;
  } else {
    const position = queues.push(chatId, item);
    return position;
  }
}
