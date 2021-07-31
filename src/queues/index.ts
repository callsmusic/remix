import { Readable } from "stream";
import { User } from "@grammyjs/types";

export interface Item {
    getReadable: () => Promise<Readable> | Readable;
    url: string;
    title: string;
    requester: User;
}

export type NowHandler = (chatId: number, now: Item) => Promise<void>;

export default new (class Queues {
    queues: Map<number, Item[]> = new Map();
    now: Map<number, Item> = new Map();
    nowHandlers: NowHandler[] = [];

    addNowHandler(handler: NowHandler) {
        this.nowHandlers.push(handler);
    }

    setNow(chatId: number, item: Item) {
        this.now.set(chatId, item);
        this.nowHandlers.forEach((handler) => handler(chatId, item));
    }

    rmNow(chatId: number) {
        return this.now.delete(chatId);
    }

    getNow(chatId: number) {
        return this.now.get(chatId);
    }

    push(chatId: number, item: Item) {
        const queue = this.queues.get(chatId);

        if (queue) {
            queue.push(item);
            return queue.length;
        }

        this.queues.set(chatId, [item]);
        return 1;
    }

    get(chatId: number) {
        const queue = this.queues.get(chatId);

        this.rmNow(chatId);

        if (queue) {
            const item = queue.shift();

            if (item) {
                this.setNow(chatId, item);
            }

            return item;
        }
    }

    getAll(chatId: number) {
        const queue = this.queues.get(chatId);

        if (queue) {
            return queue;
        }

        return [];
    }

    clear(chatId: number) {
        this.rmNow(chatId);

        if (this.queues.has(chatId)) {
            this.queues.set(chatId, []);
            return true;
        }

        return false;
    }
})();
