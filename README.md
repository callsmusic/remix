# Calls Music Remix

Stream in Telegram calls using [GramTGCalls](https://github.com/tgcallsjs/gram-tgcalls).

---

## Features

- Supports streaming audio files, voice messages and YouTube videos, even live ones!
- Can stream in multiple chats simultaneously, with their own queues.
- Friendly responses.
- Doesn't create files.

## Deployment

### Heroku

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/callsmusic/CallsMusicRemix)

### Yourself

1. Copy `example.env` to `.env` and fill it with your credentials.
2. Build TS:

```bash
npm run build
```

3. Start:

```bash
npm start
```

## Commands

### stream

Takes an audio file, voice message or YouTube video link/ID and streams/queues it.

### pause

Pauses the stream.

### resume

Resumes the stream.

### skip

Skips the current stream.

### stop

Clears the queue and removes the userbot from the call.

## License

### GNU Affero General Public License v3.0

[Read more](./LICENSE)
