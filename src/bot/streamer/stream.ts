import gramtgcalls from "../../userbot/gramtgcalls";
import queues from "../queues";
import { Item } from "../queues";
import { loop } from "../cache";

export const next = (chatId: number, force?: boolean) => async () => {
    if (loop.get(chatId) && !force) {
        const now = queues.getNow(chatId);

        if (now) {
            await stream(chatId, now);
            return true;
        }
    }

    const item = queues.get(chatId);

    if (item) {
        await stream(chatId, item, true);
        return true;
    }

    return await gramtgcalls(chatId).stop();
};

export async function stream(chatId: number, item: Item, force?: boolean) {
    const finished = gramtgcalls(chatId).audioFinished() != false;

    if (finished || force) {
        const getReadableResult = item.getReadable();

        const readable =
            getReadableResult instanceof Promise
                ? await getReadableResult
                : getReadableResult;

        await gramtgcalls(chatId).stream(
            {
                readable,
                options: { onFinish: next(chatId) },
            },
            undefined,
            { join: { videoStopped: true } },
        );

        queues.setNow(chatId, item);

        return null;
    } else {
        const position = queues.push(chatId, item);
        return position;
    }
}
