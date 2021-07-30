import gramtgcalls from "../../userbot/gramtgcalls";
import queues from "../../queues";
import { Item } from "../../queues";

export const getOnFinish = (chatId: number) => async () => {
  const item = queues.get(chatId);

  if (item) {
    await stream(chatId, item);
    return true;
  }

  return await leave(chatId);
};

export async function leave(chatId: number) {
  const result = await gramtgcalls.stop(chatId);
  queues.rmNow(chatId);
  return result;
}

export async function stop(chatId: number) {
  const result = await gramtgcalls.stop(chatId);
  queues.clear(chatId);
  return result;
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
