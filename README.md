# 🎵 [Calls Music](https://gitlab.com/callsmusic) Remix

An operational and exprimental Telegram music bot.

---

## 🎖 Achievements

-   [Mentioned in Awesome grammY](https://github.com/grammyjs/awesome-grammY)
-   [Mentioned in Awesome tgcalls](https://github.com/tgcalls/awesome-tgcalls)

## ✨ Features

### 😉 Streams whatever you like

You can stream audio files, voice messages, YouTube videos with any duration, YouTube lives, YouTube playlists and even custom inputs like radios or files in the place it is hosted!

### 📊 Streams in multiple places

Allows you to stream different things in multiple chats simultaneously. Each chat will have its own song queue.

### ⚡️ Fast & Light

Starts streaming your inputs while downloading and converting them. Also, it doesn't make produce files.

### 😎 Has cool controls

Lets you adjust volume, loop, pause, resume, mute, unmute. Also, it has a control panel.

### 👮🏻‍♀️ Safe

Accepts a command in 5 seconds, restricts control and sensitive commands to admins.

### 🗣 Speaks different languages

Remix is multilingual and speaks [various languages](#available-languages), thanks to the translators.

### 🗑 Clean

Its responses and source code don't say anything referring to Calls Music. Except some places like [`package.json`](./package.json).

## 🚀 Running

1. Copy `example.env` to `.env` and fill it with your credentials.
2. Install dependencies and build:

```bash
npm install
```

3. Start:

```bash
npm start
```

## ☁️ Cloud platforms

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/rojserbest/remix)

## ⚒ Configuring

-   `BOT_TOKEN`: Telegram bot token.
-   `STRING_SESSION`: A GramJS/Telethon string session. You can generate one [here](https://ssg.rojser.best/).
-   `API_ID`: Telegram app ID.
-   `API_HASH`: Telegram app hash.
-   `LOCALE`: An [available](#available-languages) bot language. Default: `en`.
-   `MAX_PLAYLIST_SIZE`: Max YouTube playlist size. Default: `10`.
-   `COOKIES`: Cookies for YouTube requests. Default: none.

## 📄 Commands

### 🎶 stream

#### _Aliases: s, play, p_

Takes a custom input, audio file, voice message or YouTube video/playlist link/ID and streams/queues it.

Custom inputs should be passed like this:

```text
/stream custom your_custom_input
```

### 🔍 search

#### _Aliases: find_

Search for a YouTube video.

### ✅ cancel

Cancel the active YouTube video search.

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

Skips the current stream.

### ⏹ leave [👮🏻‍♀️]

#### _Aliases: stop_

Clears the queue and removes the bot from the call.

### 🗑 cache [👮🏻‍♀️]

Deletes caches.

## 🗣 Available languages

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

## 🛫 Support

Join [our chats](https://callsmusic.me).

## 💜 Contributing

New languages, bug fixes and improvements following [our contribution guidelines](./CONTRIBUTING.md) are warmly welcomed!

## ✨ Inspiration

-   [eritislami/evobot](https://github.com/eritislami/evobot)

## 📃 License

Remix is licenced under the GNU Affero General Public License v3.0. Read more [here](./LICENSE).
