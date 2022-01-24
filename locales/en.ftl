-raw-not-in-call   = Not in call.
-raw-not-streaming = Not streaming.
-error             = ❌ | <b>{$t}</b>
-ok                = ✅ | <b>{$t}</b>
-response          = {$e} | <b>{$t}</b>
-not-in-call       = {-error(t: "Not in call.")}
-not-streaming     = {-error(t: "Not streaming.")}

not-in-call     = {-not-in-call}
not-streaming   = {-not-streaming}
raw-not-in-call = {-raw-not-in-call}

errors =
    .no-call        = {-error(t: "No active call.")}
    .no-video-found = {-error(t: "No video found.")}
    .unknown        = {-error(t: "An error occurred.")}
    .file-too-big   = {-error(t: "This file is too big.")}
    .no-assistant   = {-error(t: "My assistant is not here.")}
    .error          = {-error(t: "An error occurred:")} {$message}

inputs =
    .audio-file    = Audio File
    .custom        = Custom Input
    .voice-message = Voice Message

shuffle =
    .shuffling      = {-response(e: "🔀", t: "Shuffling...")}
    .no-enough-items = {-error(t: "No enough items to shuffle.")}

cache = {-response(e: "🗑", t: "Caches deleted.")}

now = 🎵 | Currently streaming <b><a href="{$titleUrl}">{$title}</a></b> by <b><a href="{$requesterUrl}">{$requester}</a></b>...

panel = 
    .text = {$nowEmoji} | <b><a href="{$nowUrl}">{$now}</a></b>
    ➡️ | <b><a href="{$nextUrl}">{$next}</a></b>
    .updated = Updated.
    .nothing-now   = Nothing streaming now
    .nothing-next  = Nothing streaming next

    .pause = {
        $result ->
        [true] Paused.
        [false] {-raw-not-streaming}
        *[null] {-raw-not-in-call}
    }

    .resume = {
        $result ->
        [true] Resumed.
        [false] {-raw-not-streaming}
        *[null] {-raw-not-in-call}
    }

    .skip = {
        $result ->
        [true] Skipped.
        [false] {-raw-not-streaming}
        *[null] {-raw-not-in-call}
    }

    .stop = {
        $result ->
        [true] Stopped.
        [false] {-raw-not-streaming}
        *[null] {-raw-not-in-call}
    }

    .mute = {
        $result ->
        [true] Muted.
        [false] Already muted.
        *[null] {-raw-not-in-call}
    }

    .unmute = {
        $result ->
        [true] Unmuted.
        [false] Not muted.
        *[null] {-raw-not-in-call}
    }

    .shuffling       = Shuffling...
    .volume          = Volume set to {$amount}.
    .no-enough-items = No enough items to shuffle.

playlist =
    .queuing           = 🎶 | <b>Queuing {$x} items...</b>
    .streaming-queuing = 🎶 | <b>Streaming and queuing {$x} items...</b>

volume =
    .set     = 🔈 | <b>Volume set to {$amount}.</b>
    .invalid = {-error(t: "Pass a number between 0 and 200.")}

lyrics =
    .not-found = {-error(t: "Lyrics not found.")}
    .lyrics    = <b>{$title}</b> #lyrics
    
    {$lyrics}

search =
    .canceled         = {-ok(t: "Search canceled.")},
    .no-results-found = {-error(t: "No results found.")}
    .active           = {-error(t: "There is an active search.")}
    .not_active       = {-error(t: "There is no search active.")}
    .header           = <b>🔍 | Search results for {$query}...</b>
    .no-query         = {-response(e: "❔", t: "What do you want to search for?")}
    .footer           = <i>Reply the number of the result you want to stream or /cancel.</i>
    .result           = 
        {$numberEmoji} <b><a href="{$url}">{$title}</a></b>
        {"  "}├ {$durationEmoji} {$duration}
        {"  "}├ 👁 {$views}
        {"  "}├ 📅 {$uploadTime}
        {"  "}└ 👤 {$uploader}

stream =
    .streaming = {-response(e: "▶️", t: "Streaming...")}
    .queued-at =  #️⃣ | <b>Queued at position {$position}.</b>
    .no-input = {-response(e: "❔", t: "What do you want to stream?")}

pause = {
    $result ->
    [true] {-response(e: "⏸", t: "Paused.")}
    [false] {-not-streaming}
    *[null] {-not-in-call}
}

resume = {
    $result ->
    [true] {-response(e: "▶️", t: "Resumed.")}
    [false] {-not-streaming}
    *[null] {-not-in-call}
}

skip = {
    $result ->
    [true] {-response(e: "⏩", t: "Skipped.")}
    [false] {-not-streaming}
    *[null] {-not-in-call}
}

stop = {
    $result ->
    [true] {-response(e: "⏹", t: "Stopped.")}
    [false] {-not-streaming}
    *[null] {-not-in-call}
}

mute = {
    $result ->
    [true] {-response(e: "🔇", t: "Muted.")}
    [false] {-error(t: "Already muted.")}
    *[null] {-not-in-call}
}

unmute = {
    $result ->
    [true] {-response(e: "🔈", t: "Unmuted.")}
    [false] {-error(t: "Not muted.")}
    *[null] {-not-in-call}
}

loop = {
    $result ->
    [true] {-response(e: "🔁", t: "Turned loop on.")}
    *[false] {-response(e: "🔁", t: "Turned loop off.")}
}
