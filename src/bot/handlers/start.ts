import { Composer } from 'grammy';

const composer = new Composer();

export default composer;

composer.command('start', (ctx) => ctx.reply('Merhaba ben sesli sohbet müzik botuyum.İletişm için @burakizm'));

