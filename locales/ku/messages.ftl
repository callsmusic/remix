-raw-not-in-call = لەناو پەیوەندیدا نیم.
-raw-not-streaming = هیچ پەخش ناکرێت.
-error = ❌ | <b>{ $t }</b>
-ok = ✅ | <b>{ $t }</b>
-response = { $e } | <b>{ $t }</b>
-not-in-call = { -error(t: "لەناو پەیوەندیدا نیم.") }
-not-streaming = { -error(t: "هیچ پەخش ناکرێت.") }
not-in-call = { -not-in-call }
not-streaming = { -not-streaming }
raw-not-in-call = { -raw-not-in-call }
errors = 
    .no-call = { -error(t: "پەیوەندی دەست پێ نەکراوە.") }
    .no-video-found = { -error(t: "هیچ ڤیدیۆیەک نەدۆزرایەوە.") }
    .unknown = { -error(t: "هەڵەیەک ڕوویدا.") }
    .file-too-big = { -error(t: "ئەم فایلە زۆر گەورەیە.") }
    .no-assistant = { -error(t: "هاوکارەکەم لێرە نییە.") }
    .error = { -error(t: "هەڵەیەک ڕوویدا:") } { $message }
inputs = 
    .audio-file = فایلی دەنگی
    .custom = فایلی پێدراو
    .voice-message = پەیامی دەنگی
shuffle = 
    .shuffling = { -response(e: "🔀", t: "سەرەکە تێک دەدرێت...") }
    .no-enough-items = { -error(t: "ناتوانرێت سەرەکە تێک بدرێت.") }
cache = { -response(e: "🗑", t: "کاچەکان سڕانەوە.") }
now = 🎵 | لە ئێستادا <b><a href="{ $titleUrl }">{ $title }</a></b> لەلایەن <b><a href="{ $requesterUrl }">{ $requester }</a></b> پەخش دەکرێت...
panel = 
    .text =
        { $nowEmoji } | <b><a href="{ $nowUrl }">{ $now }</a></b>
        ➡️ | <b><a href="{ $nextUrl }">{ $next }</a></b>
    .updated = نوێ کرایەوە.
    .nothing-now = ئێستا هیچ پەخش ناکرێت
    .nothing-next = دواتر هیچ پەخش ناکرێت
    .pause =
        { $result ->
            [true] ڕاگیرا.
            [false] { -raw-not-streaming }
           *[null] { -raw-not-in-call }
        }
    .resume =
        { $result ->
            [true] بەردەوام کرا.
            [false] { -raw-not-streaming }
           *[null] { -raw-not-in-call }
        }
    .skip =
        { $result ->
            [true] پەڕێنرا.
            [false] { -raw-not-streaming }
           *[null] { -raw-not-in-call }
        }
    .stop =
        { $result ->
            [true] وەستێنرا.
            [false] { -raw-not-streaming }
           *[null] { -raw-not-in-call }
        }
    .mute =
        { $result ->
            [true] بێدەنگ کرا.
            [false] خۆی بێدەنگە.
           *[null] { -raw-not-in-call }
        }
    .unmute =
        { $result ->
            [true] دەنگدار کرا.
            [false] بێدەنگ نەکراوە.
           *[null] { -raw-not-in-call }
        }
    .shuffling = سەرەکە تێک دەدرێت...
    .volume = ڕێژەی دەنگ کرا بە { $amount }.
    .no-enough-items = ناتوانرێت سەرەکە تێک بدرێت.
playlist = 
    .queuing = 🎶 | <b>{ $x } بڕگە دەخرێنە سەرەوە...</b>
    .streaming-queuing = 🎶 | <b>{ $x } بڕگە پەخش دەکرێن و دەخرێنە سەرەوە...</b>
volume = 
    .set = 🔈 | <b>ڕێژەی دەنگ کرا بە { $amount }.</b>
    .invalid = { -error(t: "ژمارەیەکم پێ بدە لەنێوان 0 و 200.") }
lyrics = 
    .not-found = { -error(t: "هیچ ژێرنووسێک نەدۆزرایەوە.") }
    .lyrics =
        <b>{ $title }</b> #ژێرنووس
        
        { $lyrics }
search = 
    .canceled = { -ok(t: "گەڕانەکە هەڵوەشێنرایەوە.") },
    .no-results-found = { -error(t: "هیچ ئەنجامێک نەدۆزرایەوە.") }
    .active = { -error(t: "گەڕانێکی دیکە چالاکە.") }
    .not_active = { -error(t: "هیچ گەڕانێک چالاک نییە.") }
    .header = <b>🔍 | ئەنجامەکانی گەڕان بۆ { $query }...</b>
    .no-query = { -response(e: "❔", t: "دەتەوێت بۆ چی بگەڕێیت؟") }
    .footer = <i>ژمارەی ئەو ئەنجامە بنێرە کە دەتەوێت پەخشی بکەیت یان /cancel بکە.</i>
    .result =
        { $numberEmoji } <b><a href="{ $url }">{ $title }</a></b>
        { "  " }├ { $durationEmoji } { $duration }
        { "  " }├ 👁 { $views }
        { "  " }├ 📅 { $uploadTime }
        { "  " }└ 👤 { $uploader }
stream = 
    .streaming = { -response(e: "▶️", t: "پەخش دەکرێت...") }
    .queued-at = #️⃣ | <b>خرایە سەرەوە: { $position }.</b>
    .no-input = { -response(e: "❔", t: "دەتەوێت چی پەخش بکەیت؟") }
pause =
    { $result ->
        [true] { -response(e: "⏸", t: "ڕاگیرا.") }
        [false] { -not-streaming }
       *[null] { -not-in-call }
    }
resume =
    { $result ->
        [true] { -response(e: "▶️", t: "بەردەوام کرا.") }
        [false] { -not-streaming }
       *[null] { -not-in-call }
    }
skip =
    { $result ->
        [true] { -response(e: "⏩", t: "پەڕێنرا.") }
        [false] { -not-streaming }
       *[null] { -not-in-call }
    }
stop =
    { $result ->
        [true] { -response(e: "⏹", t: "وەستێنرا.") }
        [false] { -not-streaming }
       *[null] { -not-in-call }
    }
mute =
    { $result ->
        [true] { -response(e: "🔇", t: "بێدەنگ کرا.") }
        [false] { -error(t: "خۆی بێدەنگە.") }
       *[null] { -not-in-call }
    }
unmute =
    { $result ->
        [true] { -response(e: "🔈", t: "دەنگدار کرا.") }
        [false] { -error(t: "بێدەنگ نەکراوە.") }
       *[null] { -not-in-call }
    }
loop =
    { $result ->
        [true] { -response(e: "🔁", t: "دووبارەکردنەوە چالاک کرا.") }
       *[false] { -response(e: "🔁", t: "دووبارەکردنەوە ناچالاک کرا.") }
    }
