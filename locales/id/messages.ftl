-raw-not-in-call = Tidak dalam panggilan.
-raw-not-streaming = Tidak streaming.
-error = ❌ | <b>{ $t }</b>
-ok = ✅ | <b>{ $t }</b>
-response = { $e } | <b>{ $t }</b>
-not-in-call = { -error(t: "Tidak dalam panggilan.") }
-not-streaming = { -error(t: "Not streaming.") }
not-in-call = { -not-in-call }
not-streaming = { -not-streaming }
raw-not-in-call = { -raw-not-in-call }
errors = 
    .no-call = { -error(t: "Tidak ada panggilan aktif.") }
    .no-video-found = { -error(t: "Tidak ada video yang ditemukan.") }
    .unknown = { -error(t: "Terjadi kesalahan.") }
    .file-too-big = { -error(t: "File ini terlalu besar.") }
    .no-assistant = { -error(t: "Asisten saya tidak ada di sini.") }
    .error = { -error(t: "Terjadi kesalahan:") } { $message }
inputs = 
    .audio-file = Berkas Audio
    .custom = Masukan Kustom
    .voice-message = Pesan Suara
shuffle = 
    .shuffling = { -response(e: "🔀", t: "Mengacak...") }
    .no-enough-items = { -error(t: "Tidak ada cukup item untuk diacak.") }
cache = { -response(e: "🗑", t: "Cache dihapus.") }
now = 🎵 | Sedang streaming <b><a href="{ $titleUrl }">{ $title }</a></b> oleh <b><a href="{ $requesterUrl }">{ $requester }</a></b>...
panel = 
    .text =
        { $nowEmoji } | <b><a href="{ $nowUrl }">{ $now }</a></b>
        ➡️ | <b><a href="{ $nextUrl }">{ $next }</a></b>
    .updated = Diperbarui.
    .nothing-now = Tidak ada streaming sekarang
    .nothing-next = Tidak ada streaming selanjutnya
    .pause =
        { $result ->
            [true] Dijeda.
            [false] { -raw-not-streaming }
           *[null] { -raw-not-in-call }
        }
    .resume =
        { $result ->
            [true] Dilanjutkan.
            [false] { -raw-not-streaming }
           *[null] { -raw-not-in-call }
        }
    .skip =
        { $result ->
            [true] Dilewati.
            [false] { -raw-not-streaming }
           *[null] { -raw-not-in-call }
        }
    .stop =
        { $result ->
            [true] Berhenti.
            [false] { -raw-not-streaming }
           *[null] { -raw-not-in-call }
        }
    .mute =
        { $result ->
            [true] Dibisukan.
            [false] Sudah dibisukan.
           *[null] { -raw-not-in-call }
        }
    .unmute =
        { $result ->
            [true] Disuarakan.
            [false] Tidak dibisukan.
           *[null] { -raw-not-in-call }
        }
    .shuffling = Mengacak...
    .volume = Volume disetel ke { $amount }.
    .no-enough-items = Tidak ada cukup item untuk diacak.
playlist = 
    .queuing = 🎶 | <b>Mengantri { $x } item...</b>
    .streaming-queuing = 🎶 | <b>Streaming dan antrian { $x } item...</b>
volume = 
    .set = 🔈 | <b>Volume disetel ke { $amount }.</b>
    .invalid = { -error(t: "Lewati angka antara 0 dan 200.") }
lyrics = 
    .not-found = { -error(t: "Lirik tidak ditemukan.") }
    .lyrics =
        <b>{ $title }</b> #lirik
        
        { $lyrics }
search = 
    .canceled = { -ok(t: "Pencarian dibatalkan.") },
    .no-results-found = { -error(t: "Tidak ada hasil yang ditemukan.") }
    .active = { -error(t: "Ada pencarian aktif.") }
    .not_active = { -error(t: "Tidak ada pencarian yang aktif.") }
    .header = <b>🔍 | Hasil pencarian { $query }...</b>
    .no-query = { -response(e: "❔", t: "Apa yang ingin Anda cari?") }
    .footer = <i>Balas nomor hasil yang ingin Anda streaming atau /cancel.</i>
    .result =
        { $numberEmoji } <b><a href="{ $url }">{ $title }</a></b>
        { "  " }├ { $durationEmoji } { $duration }
        { "  " }├ 👁 { $views }
        { "  " }├ 📅 { $uploadTime }
        { "  " }└ 👤 { $uploader }
stream = 
    .streaming = { -response(e: "▶️", t: "Streaming...") }
    .queued-at = #️⃣ | <b>Antri di posisi { $position }.</b>
    .no-input = { -response(e: "❔", t: "Apa yang ingin Anda streaming?") }
pause =
    { $result ->
        [true] { -response(e: "⏸", t: "Dijeda.") }
        [false] { -not-streaming }
       *[null] { -not-in-call }
    }
resume =
    { $result ->
        [true] { -response(e: "▶️", t: "Dilanjutkan.") }
        [false] { -not-streaming }
       *[null] { -not-in-call }
    }
skip =
    { $result ->
        [true] { -response(e: "⏩", t: "Dilewati.") }
        [false] { -not-streaming }
       *[null] { -not-in-call }
    }
stop =
    { $result ->
        [true] { -response(e: "⏹", t: "Berhenti.") }
        [false] { -not-streaming }
       *[null] { -not-in-call }
    }
mute =
    { $result ->
        [true] { -response(e: "🔇", t: "Dibisukan.") }
        [false] { -error(t: "Sudah dibisukan.") }
       *[null] { -not-in-call }
    }
unmute =
    { $result ->
        [true] { -response(e: "🔈", t: "Disuarakan.") }
        [false] { -error(t: "Tidak dibisukan.") }
       *[null] { -not-in-call }
    }
loop =
    { $result ->
        [true] { -response(e: "🔁", t: "Putaran diaktifkan.") }
       *[false] { -response(e: "🔁", t: "Putaran dimatikan.") }
    }
