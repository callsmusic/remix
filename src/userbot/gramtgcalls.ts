import GramTGCalls from "gram-tgcalls";
import { client } from ".";

const instances = new Map<number, GramTGCalls>();

export default (chatId: number) => {
    if (instances.has(chatId)) {
        return instances.get(chatId)!;
    }

    instances.set(chatId, new GramTGCalls(client, chatId));
    return instances.get(chatId)!;
};
