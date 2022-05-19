-raw-not-in-call = Ne di nav pêwendiyê de me.
-raw-not-streaming = Ti tiştekî nayê lêxistin.
-error = ❌ | <b>{ $t }</b>
-ok = ✅ | <b>{ $t }</b>
-response = { $e } | <b>{ $t }</b>
-not-in-call = { -error(t: "Ne di nav pêwendiyê de me.") }
-not-streaming = { -error(t: "Ti tiştekî nayê lêxistin.") }
not-in-call = { -not-in-call }
not-streaming = { -not-streaming }
raw-not-in-call = { -raw-not-in-call }
errors = 
    .no-call = { -error(t: "Ni pêwendiyekê nehatiye destpêkirin.") }
    .no-video-found = { -error(t: "Ti vîdyoyekê nehat dîtin.") }
    .unknown = { -error(t: "Şaşiyekê çê bû.") }
    .file-too-big = { -error(t: "Ev fayl gelek mezin e.") }
    .no-assistant = { -error(t: "Alîkara min ne li vir e.") }
    .error = { -error(t: "Şaşiyekê çê bû:") } { $message }
inputs = 
    .audio-file = Fayla Dengî
    .custom = Fayla Daxwazkirî
    .voice-message = Peyama Dengî
shuffle = 
    .shuffling = { -response(e: "🔀", t: "Sirayê tê têkvedan...") }
    .no-enough-items = { -error(t: "Di niha de sirayê nikare bê têkvedan.") }
cache = { -response(e: "🗑", t: "Kaşan hatin jêbirin.") }
now = 🎵 | Di niha de <b><a href="{ $titleUrl }">{ $title }</a></b> ji aliyê <b><a href="{ $requesterUrl }">{ $requester }</a></b> tê lêxistin...
panel = 
    .text =
        { $nowEmoji } | <b><a href="{ $nowUrl }">{ $now }</a></b>
        ➡️ | <b><a href="{ $nextUrl }">{ $next }</a></b>
    .updated = Hat nûkirin.
    .nothing-now = Di niha de ti tiştekî nayê lêxistin
    .nothing-next = Di paş de ti tiştekî nayê lêxistin
    .pause =
        { $result ->
            [true] Hat rawestandin.
            [false] { -raw-not-streaming }
           *[null] { -raw-not-in-call }
        }
    .resume =
        { $result ->
            [true] Hat domandin.
            [false] { -raw-not-streaming }
           *[null] { -raw-not-in-call }
        }
    .skip =
        { $result ->
            [true] Hat piştguhkirin.
            [false] { -raw-not-streaming }
           *[null] { -raw-not-in-call }
        }
    .stop =
        { $result ->
            [true] Bi dawî hat anîn.
            [false] { -raw-not-streaming }
           *[null] { -raw-not-in-call }
        }
    .mute =
        { $result ->
            [true] Hat bêdengkirin.
            [false] Ji xwe bêdeng e.
           *[null] { -raw-not-in-call }
        }
    .unmute =
        { $result ->
            [true] Hat bidengkirin.
            [false] Ji xwe bideng e.
           *[null] { -raw-not-in-call }
        }
    .shuffling = Sirayê tê têkvedan...
    .volume = Rêjeya dengê bû { $amount }.
    .no-enough-items = Di niha de sirayê nikare bê têkvedan.
playlist = 
    .queuing = 🎶 | <b>{ $x } tên xistin nav sirayê...</b>
    .streaming-queuing = 🎶 | <b>{ $x } tên lêxistin û tên xisting nav sirayê...</b>
volume = 
    .set = 🔈 | <b>Rêjeya dengê bû { $amount }.</b>
    .invalid = { -error(t: "Hejmare di navbera 0 û 200 de bide min.") }
lyrics = 
    .not-found = { -error(t: "Ti jêrnivîsekê nehat dîtin") }
    .lyrics =
        <b>{ $title }</b> #jêrnivîs
        
        { $lyrics }
search = 
    .canceled = { -ok(t: "Lêgerînê hat hilweşandin.") },
    .no-results-found = { -error(t: "Ti encamekê nehat dîtin") }
    .active = { -error(t: "Lêgerîneke din çalak e.") }
    .not_active = { -error(t: "Ti lêgerînekê ne çalak e.") }
    .header = <b>🔍 | Encamên lêgerînê: { $query }...</b>
    .no-query = { -response(e: "❔", t: "Dixwazî bo çi bigerî?") }
    .footer = <i>Hejmara encamê bişîne yan jî /cancel bike.</i>
    .result =
        { $numberEmoji } <b><a href="{ $url }">{ $title }</a></b>
        { "  " }├ { $durationEmoji } { $duration }
        { "  " }├ 👁 { $views }
        { "  " }├ 📅 { $uploadTime }
        { "  " }└ 👤 { $uploader }
stream = 
    .streaming = { -response(e: "▶️", t: "Tê lêxistin...") }
    .queued-at = #️⃣ | <b>Di nav sirayê de ye: { $position }.</b>
    .no-input = { -response(e: "❔", t: "Dixwazî çi lêbixî") }
pause =
    { $result ->
        [true] { -response(e: "⏸", t: "Hat rawestandin.") }
        [false] { -not-streaming }
       *[null] { -not-in-call }
    }
resume =
    { $result ->
        [true] { -response(e: "▶️", t: "Hat domandin.") }
        [false] { -not-streaming }
       *[null] { -not-in-call }
    }
skip =
    { $result ->
        [true] { -response(e: "⏩", t: "Hat piştguhkirin.") }
        [false] { -not-streaming }
       *[null] { -not-in-call }
    }
stop =
    { $result ->
        [true] { -response(e: "⏹", t: "Bi dawî hat anîn.") }
        [false] { -not-streaming }
       *[null] { -not-in-call }
    }
mute =
    { $result ->
        [true] { -response(e: "🔇", t: "Hat bêdengkirin.") }
        [false] { -error(t: "Ji xwe bêdeng e.") }
       *[null] { -not-in-call }
    }
unmute =
    { $result ->
        [true] { -response(e: "🔈", t: "Bat bidengkirin.") }
        [false] { -error(t: "Ji xwe bideng e.") }
       *[null] { -not-in-call }
    }
loop =
    { $result ->
        [true] { -response(e: "🔁", t: "Dubarekirin hat çalakkirin...") }
       *[false] { -response(e: "🔁", t: "Dubarekirin hat neçalakkirin...") }
    }
