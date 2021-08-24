# Calls Music Remix [![Mentioned in Awesome Telegram Calls](https://awesome.re/mentioned-badge-flat.svg)](https://github.com/tgcalls/awesome-tgcalls) [![Mentioned in Awesome grammY](https://awesome.re/mentioned-badge-flat.svg)](https://github.com/grammyjs/awesome-grammY)

Stream in Telegram calls using [GramTGCalls](https://github.com/tgcallsjs/gram-tgcalls).

---

## Features

-   Various sources to stream from:
    -   Custom URLs.
    -   YouTube playlists.
    -   Small audio files and voice messages.
    -   YouTube videos (no duration limit, even live videos).
-   Stream in multiple chats simultaneously, with their own queues.
-   Control volume.
-   Friendly responses.
-   Doesn't create files.
-   Multilingual.

## Running

1. Copy `example.env` to `.env` and fill it with your credentials.
2. Install dependencies and build:

```bash
npm install
```

3. Start:

```bash
npm start
```

## Deploying to the cloud

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/callsmusic/CallsMusicRemix)

## Configuring

-   `BOT_TOKEN`: Telegram bot token.
-   `STRING_SESSION`: A GramJS/Telethon string session. You can generate one [here](https://ssg.rojser.best/).
-   `API_ID`: Telegram app ID.
-   `API_HASH`: Telegram app hash.
-   `LOCALE`: An [available](#available-languages) bot language. Default: `en`.
-   `MAX_PLAYLIST_SIZE`: Max YouTube playlist size. Default: `10`.
-   `COOKIES`: Cookies for YouTube requests. Default: none.

## Commands

### stream

#### _Aliases: s, play, p_

Takes a custom input, audio file, voice message or YouTube video/playlist link/ID and streams/queues it.

Custom inputs should be passed like this:

```text
/stream custom your_custom_input
```

### playlist

#### _Aliases: pl, list_

Streams a YouTube playlist.

### now

#### _Aliases: ns, cs, np, cp_

Displays the currently streamed item.

### volume

#### _Aliases: vol, v_

Sets the volume.

### pause

Pauses the stream.

### resume

#### _Aliases: re, res, continue_

Resumes the stream.

### mute

#### _Aliases: m_

Mutes the stream.

### unmute

#### _Aliases: um_

Unmutes the stream.

### skip

#### _Aliases: next_

Skips the current stream.

### leave

#### _Aliases: stop_

Clears the queue and removes the bot from the call.

## Available languages

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

## Contributing

New languages, bug fixes and improvements following [our contribution guidelines](./CONTRIBUTING.md) are warmly welcomed!

## Inspiration

-   [eritislami/evobot](https://github.com/eritislami/evobot)

## License

### GNU Affero General Public License v3.0

[Read more](./LICENSE)
