import { Message } from "@grammyjs/types";

export default (message: Message) =>
    `https://t.me/c/${String(message.chat.id).slice(4)}/${message.message_id}`;
