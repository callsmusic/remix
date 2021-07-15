# Calls Music Remix

Stream audio in Telegram calls using [GramTGCalls](https://github.com/tgcallsjs/gram-tgcalls).

---

## Requirements

-  Telegram app ID and hash from [my.telegram.org](https://github.com/).
-  Telegram bot token from [@BotFather](https://t.me/BotFather).
-  FFmpeg

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

## License

### GNU Affero General Public License v3.0

[Read more](./LICENSE)
