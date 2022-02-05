-raw-not-in-call = Nicht im Gespräch.
-raw-not-streaming = Kein Streaming.
-error = ❌ | <b>{ $t }</b>
-ok = ✅ | <b>{ $t }</b>
-response = { $e } | <b>{ $t }</b>
-not-in-call = { -error(t: "Nicht im Anruf.") }
-not-streaming = { -error(t: "Kein Streaming.") }
not-in-call = { -not-in-call }
not-streaming = { -not-streaming }
raw-not-in-call = { -raw-not-in-call }
errors = 
    .no-call = { -error(t: "Kein aktiver Anruf.") }
    .no-video-found = { -error(t: "Kein Video gefunden.") }
    .unknown = { -error(t: "Ein Fehler ist aufgetreten.") }
    .file-too-big = { -error(t: "Diese Datei ist zu groß.") }
    .no-assistant = { -error(t: "Mein Assistent ist nicht hier.") }
    .error = { -error(t: "Ein Fehler ist aufgetreten:") } { $message }
inputs = 
    .audio-file = Audio-Datei
    .custom = Eigene Eingabe
    .voice-message = Sprachnachricht
shuffle = 
    .shuffling = { -response(e: "🔀", t: "Mischen...") }
    .no-enough-items = { -error(t: "Nicht genügend Elemente zum Mischen.") }
cache = { -response(e: "🗑", t: "Cache gelöscht.") }
now = 🎵 | Aktueller Stream <b><a href="{ $titleUrl }">{ $title }</a></b> by <b><a href="{ $requesterUrl }">{ $requester }</a></b>...
panel = 
    .text =
        { $nowEmoji } | <b><a href="{ $nowUrl }">{ $now }</a></b>
        ➡️ | <b><a href="{ $nextUrl }">{ $next }</a></b>
    .updated = Updated.
    .nothing-now = Derzeit keine Streams
    .nothing-next = Kein Song als nächstes
    .pause =
        { $result ->
            [true] Pausiert.
            [false] { -raw-not-streaming }
           *[null] { -raw-not-in-call }
        }
    .resume =
        { $result ->
            [true] Fortgesetzt.
            [false] { -raw-not-streaming }
           *[null] { -raw-not-in-call }
        }
    .skip =
        { $result ->
            [true] Übersprungen.
            [false] { -raw-not-streaming }
           *[null] { -raw-not-in-call }
        }
    .stop =
        { $result ->
            [true] Gestoppt.
            [false] { -raw-not-streaming }
           *[null] { -raw-not-in-call }
        }
    .mute =
        { $result ->
            [true] Verstummt.
            [false] Already muted.
           *[null] { -raw-not-in-call }
        }
    .unmute =
        { $result ->
            [true] Entstummt.
            [false] Not muted.
           *[null] { -raw-not-in-call }
        }
    .shuffling = Mischen...
    .volume = Lautstärke auf { $amount } gesetzt.
    .no-enough-items = Nicht genug Songs zum Mischen.
playlist = 
    .queuing = 🎶 | <b>{ $x } Songs befinden sich in der Warteschlange...</b>
    .streaming-queuing = 🎶 | <b>Streaming und Warteschlange { $x } Songs...</b>
volume = 
    .set = 🔈 | <b>Lautstärke auf { $amount } gesetzt.</b>
    .invalid = { -error(t: "Gib eine Zahl zwischen 0 und 200 ein!") }
lyrics = 
    .not-found = { -error(t: "Lyrics nicht gefunden.") }
    .lyrics =
        <b>{ $title }</b> #lyrics
        
        { $lyrics }
search = 
    .canceled = { -ok(t: "Suche abgebrochen.") },
    .no-results-found = { -error(t: "Keine Ergebnisse gefunden.") }
    .active = { -error(t: "Es gibt bereits eine aktive Suche.") }
    .not_active = { -error(t: "Es gibt keine aktive Suche.") }
    .header = <b>🔍 | Suche nach { $query }...</b>
    .no-query = { -response(e: "❔", t: "Wonach suchst Du?") }
    .footer = <i>Gib die Nummer des Ergebnisses an, das Du streamen möchtest, oder brich die Suche mit /cancel ab!</i>
    .result =
        { $numberEmoji } <b><a href="{ $url }">{ $title }</a></b>
        { "  " }├ { $durationEmoji } { $duration }
        { "  " }├ 👁 { $views }
        { "  " }├ 📅 { $uploadTime }
        { "  " }└ 👤 { $uploader }
stream = 
    .streaming = { -response(e: "▶️", t: "Spiele...") }
    .queued-at = #️⃣ | <b>In Warteschlange an Position { $position }.</b>
    .no-input = { -response(e: "❔", t: "Was möchtest Du streamen?") }
pause =
    { $result ->
        [true] { -response(e: "⏸", t: "Pausiert") }
        [false] { -not-streaming }
       *[null] { -not-in-call }
    }
resume =
    { $result ->
        [true] { -response(e: "▶️", t: "Fortgesetzt") }
        [false] { -not-streaming }
       *[null] { -not-in-call }
    }
skip =
    { $result ->
        [true] { -response(e: "⏩", t: "Übersprungen") }
        [false] { -not-streaming }
       *[null] { -not-in-call }
    }
stop =
    { $result ->
        [true] { -response(e: "⏹", t: "Gestoppt") }
        [false] { -not-streaming }
       *[null] { -not-in-call }
    }
mute =
    { $result ->
        [true] { -response(e: "🔇", t: "Verstummt.") }
        [false] { -error(t: "Bereits stumm...") }
       *[null] { -not-in-call }
    }
unmute =
    { $result ->
        [true] { -response(e: "🔈", t: "Entstummt.") }
        [false] { -error(t: "Nicht verstummt...") }
       *[null] { -not-in-call }
    }
loop =
    { $result ->
        [true] { -response(e: "🔁", t: "Dauerschleife eingeschaltet") }
       *[false] { -response(e: "🔁", t: "Dauerschleife ausgeschaltet") }
    }
