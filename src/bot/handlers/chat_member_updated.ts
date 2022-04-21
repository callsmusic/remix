import { Composer } from '../composer'

const composer = new Composer()

export default composer

composer.on('chat_member', ctx => {
  const member = ctx.chatMember.new_chat_member
  if (ctx.session.admins.length == 0) {
    return
  }
  if (
    (member.status == 'creator' ||
      (member.status == 'administrator' && member.can_manage_video_chats)) &&
    !member.is_anonymous
  ) {
    if (!ctx.session.admins.includes(member.user.id)) {
      ctx.session.admins.push(member.user.id)
    }
  } else if (ctx.session.admins.includes(member.user.id)) {
    delete ctx.session.admins[ctx.session.admins.indexOf(member.user.id)]
  }
})
