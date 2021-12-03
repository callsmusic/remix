# 🎵 [Calls Music](https://github.com/callsmusic) Remix

An operational and exprimental Telegram music bot.

---

## 🎖 <a name="achievements"></a>Achievements

- [Mentioned in Awesome grammY](https://github.com/grammyjs/awesome-grammY)
- [Mentioned in Awesome tgcalls](https://github.com/tgcalls/awesome-tgcalls)

## ✨ <a name="features"></a>Features

### 😉 Streams whatever you like

You can stream audio files, voice messages, YouTube videos with any duration, YouTube lives, YouTube playlists and even custom inputs like radios or files in the place it is hosted!

### 📊 Streams in multiple places

Allows you to stream different things in multiple chats simultaneously. Each chat will have its own song queue.

### ⚡️ Fast & Light

Starts streaming your inputs while downloading and converting them. Also, it doesn't make produce files.

### 😎 Has cool controls

Lets you adjust volume, loop, pause, resume, mute, unmute. Also, it has a control panel.

### 👮🏻‍♀️ Safe

Restricts control and sensitive commands to admins.

### 🗣 Speaks different languages

Remix is multilingual and speaks [various languages](#available-languages), thanks to the translators.

### 🗑 Clean

Its responses and source code don't say anything referring to Calls Music. Except some places like [`package.json`](./package.json).

## 🚀 <a name="running"></a>Running

1. Copy `example.env` to `.env` and fill it with your credentials.
2. Install dependencies and build:

```bash
npm install && npm run build
```

3. Start:

```bash
npm start
```

## ☁️ <a name="cloud"></a>Cloud platforms

[![Deploy on Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/callsmusic/remix)

## ⚒ <a name="configuring"></a>Configuring

- `BOT_TOKEN`: Telegram bot token.
- `STRING_SESSION`: A GramJS/Telethon string session. You can generate one [here](https://ssg.rojser.best/).
- `API_ID`: Telegram app ID.
- `API_HASH`: Telegram app hash.
- `LOCALE`: An [available](#available-languages) bot language. Default: `en`.
- `MAX_PLAYLIST_SIZE`: Max YouTube playlist size. Default: `10`.
- `COOKIES`: Cookies for YouTube requests. Default: none.

## 📄 <a name="commands"></a>Commands

### 🎶 stream

#### _Aliases: s, play, p_

Takes a custom input, audio file, voice message or YouTube video/playlist link/ID and streams/queues it.

Custom inputs should be passed like this:

```text
/stream custom your_custom_input
```

### 🔍 search

#### _Aliases: find_

Searches for a YouTube video.

### ✅ cancel

Cancels the active YouTube video search.

### 🔢 playlist

#### _Aliases: pl, list_

Streams a YouTube playlist.

### 🎵 now

#### _Aliases: ns, cs, np, cp_

Displays the currently streamed item.

### 🎛 panel [👮🏻‍♀️]

#### _Aliases: menu, control, controls_

Opens the controls panel.

### 🔁 loop [👮🏻‍♀️]

#### _Aliases: repeat_

Toggles loop.

### 🔀 shuffle [👮🏻‍♀️]

#### _Aliases: sh, mix_

Shuffles the items in the queue.

### 🔉 volume [👮🏻‍♀️]

#### _Aliases: vol, v_

Sets the volume.

### ⏸ pause [👮🏻‍♀️]

Pauses the stream.

### ▶️ resume [👮🏻‍♀️]

#### _Aliases: re, res, continue_

Resumes the stream.

### 🔇 mute [👮🏻‍♀️]

#### _Aliases: m_

Mutes the stream.

### 🔈 unmute [👮🏻‍♀️]

#### _Aliases: um_

Unmutes the stream.

### ⏩ skip [👮🏻‍♀️]

#### _Aliases: next_

Skips the current item.

### ⏹ leave [👮🏻‍♀️]

#### _Aliases: stop_

Clears the queue and stops streaming.

### 🗑 cache [👮🏻‍♀️]

Deletes caches.

## 🗣 <a name="available-languages"></a>Available languages

```text
bn    Bengali
ckb   Central Kurdish
de    German
en    English
es    Spanish
fa    Farsi
id    Indonesian
ml    Malayalam
pt_BR Brazilian Portuguese
si    Sinhalese
tr    Turkish
```

## 🛫 <a name="support"></a>Support

Join [our chats](https://callsmusic.me).

## 💜 <a name="contributing"></a>Contributing

New languages, bug fixes and improvements following [our contribution guidelines](./CONTRIBUTING.md) are warmly welcomed!

## ✨ <a name="credits"></a>Credits

- [Andrew](https://github.com/AndrewLaneX), creator of [tgcallsjs](https://github.com/tgcallsjs) — a Node.js library for connecting to Telegram calls.
- [Painor](https://github.com/painor), creator of [GramJS](https://github.com/gram-js/gramjs) — a super cool MTProto client.
- [Knorpel Senf](https://github.com/KnorpelSenf), creator of [grammY](https://github.com/grammyjs) — a framework for Telegram bot API.
- [Tobias Kutscha](https://github.com/TimeForANinja), creator of [ytsr](https://github.com/TimeForANinja/node-ytsr) for searching YouTube and [ytpl](https://github.com/TimeForANinja/node-ytpl) for fetching YouTube playlists.
- Me, [Roj](https://github.com/rojserbest), for creating [gram-tgcalls](https://github.com/tgcalls/gram-tgcalls) — a helper lib which connects GramJS to tgcallsjs.
- A bunch of other special people which which can't be listed here.

## 📃 <a name="license"></a>License

Remix is licenced under the GNU Affero General Public License v3.0. Read more [here](./LICENSE).
