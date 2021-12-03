import { Composer } from "grammy";
import { admins } from "../cache";

const composer = new Composer();

export default composer;

composer.on(":new_chat_members", (ctx) => {
  const chat = ctx.chatMember!.chat.id;
  const member = ctx.chatMember!.new_chat_member;

  if (admins.get(chat) == undefined) {
    return;
  }

  if (
    (member.status == "creator" ||
      (member.status == "administrator" && member.can_manage_voice_chats)) &&
    !member.is_anonymous
  ) {
    if (!admins.get(chat)!.includes(member.user.id)) {
      admins.get(chat)!.push(member.user.id);
    }
  } else if (admins.get(chat)!.includes(member.user.id)) {
    const currentState = admins.get(chat)!;
    delete admins.get(chat)![currentState.indexOf(member.user.id)];
  }
});
