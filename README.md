# Calls Music Remix

Stream YouTube videos and audio files in Telegram calls using [GramTGCalls](https://github.com/tgcallsjs/gram-tgcalls).

---

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
