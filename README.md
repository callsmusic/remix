# Calls Music Remix

Stream in Telegram calls using [GramTGCalls](https://github.com/tgcallsjs/gram-tgcalls).

---

## Features

-   Supports streaming audio files, voice messages, YouTube playlists and YouTube videos, even live ones!
-   Can stream in multiple chats simultaneously, with their own queues.
-   Friendly responses.
-   Doesn't create files.
-   Multilingual.

## Deployment

### Heroku

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/callsmusic/CallsMusicRemix)

### Yourself

1. Copy `example.env` to `.env` and fill it with your credentials.
2. Start:

```bash
npm start
```

## Commands

### stream

#### _Aliases: s, p, play_

Takes an audio file, voice message or YouTube video link/ID and streams/queues it.

### playlist

#### _Aliases: pl_

Streams a YouTube playlist.

### ns

#### _Aliases: np, cs, cp_

Displays the currently streamed item.

### pause

#### _Aliases: p_

Pauses the stream.

### resume

#### _Aliases: r_

Resumes the stream.

### skip

#### _Aliases: next_

Skips the current stream.

### stop

Clears the queue and removes the userbot from the call.

## Inspiration

-   [eritislami/evobot](https://github.com/eritislami/evobot)

## License

### GNU Affero General Public License v3.0

[Read more](./LICENSE)
