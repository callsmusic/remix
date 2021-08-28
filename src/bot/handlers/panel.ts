import { Composer, InlineKeyboard } from "grammy";
import gramtgcalls from "../../userbot/gramtgcalls";
import queues from "../../queues";
import { stream, stop, getOnFinish } from "../streamer";
import i18n from "../i18n";

const composer = new Composer();

export default composer;

const panelOther = {
    disable_web_page_preview: true,
    reply_markup: new InlineKeyboard()
        .text("🔀", "panel_shuffle")
        .text("⏩", "panel_skip")
        .text("⏸", "panel_pause")
        .text("▶️", "panel_resume")
        .row()
        .text("🔇", "panel_mute")
        .text("🔈", "panel_unmute")
        .text("🔉", "panel_voldec")
        .text("🔊", "panel_volinc")
        .row()
        .text("🔄", "update"),
};

const getPanelText = (chatId: number) => {
    const nowItem = queues.getNow(chatId);
    const nextItem = queues.getNext(chatId);

    const now = nowItem?.title || i18n("nothing_now");
    const next = nextItem?.title || i18n("nothing_next");

    const nowUrl = nowItem?.url || "";
    const nextUrl = nextItem?.url || "";

    return i18n("panel", { now, next, nowUrl, nextUrl });
};

const getIncrement = (current?: number) => {
    const toReturn = current ? current + 1000 : 10000;
    return toReturn > 20000 ? 20000 : toReturn;
};

const getDecrement = (current?: number) => {
    const toReturn = current ? current - 1000 : 5000;
    return toReturn < 0 ? 1 : toReturn;
};

composer.command(["menu", "m", "controls", "panel"], (ctx) =>
    ctx.reply(getPanelText(ctx.chat.id), panelOther),
);

composer.callbackQuery(/^panel_(.+)$/, async (ctx) => {
    if (!ctx.chat?.id) {
        return;
    }

    const command = ctx.match?.[1]!;
    const current = gramtgcalls(ctx.chat.id).volume;

    switch (command) {
        case "update":
            try {
                await ctx.editMessageText(
                    getPanelText(ctx.chat.id),
                    panelOther,
                );
            } catch (err) {
            } finally {
                await ctx.answerCallbackQuery({ text: "Updated" });
            }
            break;
        case "shuffle":
            if (gramtgcalls(ctx.chat.id).pause() == null) {
                await ctx.answerCallbackQuery({
                    text: i18n("panel_not_in_call"),
                    show_alert: true,
                });
                return;
            }

            const result = queues.suffle(ctx.chat.id);

            if (result == false) {
                await ctx.answerCallbackQuery({
                    text: i18n("panel_no_enough_items"),
                    show_alert: true,
                });
                return;
            }

            await ctx.answerCallbackQuery({
                text: i18n("panel_shuffling"),
                show_alert: true,
            });
            await stream(ctx.chat.id, result, true);
            gramtgcalls(ctx.chat.id).resume();
            break;
        case "skip":
            switch (await getOnFinish(ctx.chat.id)()) {
                case true:
                    await ctx.answerCallbackQuery({
                        text: i18n("panel_skipped"),
                        show_alert: true,
                    });
                case false:
                    await ctx.answerCallbackQuery({
                        text: i18n("panel_not_streaming"),
                        show_alert: true,
                    });
                case null:
                    await ctx.answerCallbackQuery({
                        text: i18n("panel_not_in_call"),
                        show_alert: true,
                    });
            }
            break;
        case "pause":
            switch (gramtgcalls(ctx.chat.id).pause()) {
                case true:
                    await ctx.answerCallbackQuery({
                        text: i18n("panel_paused"),
                        show_alert: true,
                    });
                case false:
                    await ctx.answerCallbackQuery({
                        text: i18n("panel_not_streaming"),
                        show_alert: true,
                    });
                case null:
                    await ctx.answerCallbackQuery({
                        text: i18n("panel_not_in_call"),
                        show_alert: true,
                    });
            }
            break;
        case "resume":
            switch (gramtgcalls(ctx.chat.id).resume()) {
                case true:
                    await ctx.answerCallbackQuery({
                        text: i18n("panel_resumed"),
                        show_alert: true,
                    });
                case false:
                    await ctx.answerCallbackQuery({
                        text: i18n("panel_not_paused"),
                        show_alert: true,
                    });
                case null:
                    await ctx.answerCallbackQuery({
                        text: i18n("panel_not_in_call"),
                        show_alert: true,
                    });
            }
            break;
        case "mute":
            switch (gramtgcalls(ctx.chat.id).mute()) {
                case true:
                    await ctx.answerCallbackQuery({
                        text: i18n("panel_muted"),
                        show_alert: true,
                    });
                case false:
                    await ctx.answerCallbackQuery({
                        text: i18n("panel_already_muted"),
                        show_alert: true,
                    });
                case null:
                    await ctx.answerCallbackQuery({
                        text: i18n("panel_not_in_call"),
                        show_alert: true,
                    });
            }
            break;
        case "unmute":
            switch (gramtgcalls(ctx.chat.id).unmute()) {
                case true:
                    await ctx.answerCallbackQuery({
                        text: i18n("panel_unmuted"),
                        show_alert: true,
                    });
                case false:
                    await ctx.answerCallbackQuery({
                        text: i18n("panel_not_muted"),
                        show_alert: true,
                    });
                case null:
                    await ctx.answerCallbackQuery({
                        text: i18n("panel_not_in_call"),
                        show_alert: true,
                    });
            }
            break;
        case "volinc":
            const increment = getIncrement(current);

            if (
                await gramtgcalls(ctx.chat.id).editSelf({ volume: increment })
            ) {
                await ctx.answerCallbackQuery({
                    text: i18n("panel_volume_set", {
                        amount: String(increment),
                    }),
                    show_alert: true,
                });
            } else {
                await ctx.answerCallbackQuery({
                    text: i18n("panel_not_in_call"),
                    show_alert: true,
                });
            }
            break;
        case "voldec":
            const decrement = getDecrement(current);

            if (
                await gramtgcalls(ctx.chat.id).editSelf({ volume: decrement })
            ) {
                await ctx.answerCallbackQuery({
                    text: i18n("panel_volume_set", {
                        amount: String(decrement),
                    }),
                    show_alert: true,
                });
            } else {
                await ctx.answerCallbackQuery({
                    text: i18n("panel_not_in_call"),
                    show_alert: true,
                });
            }
    }
});
