import { REST } from '@discordjs/rest';
import { environment } from './environment';

const client = new REST({ version: '10' }).setToken(
  environment.DISCORD_BOT_TOKEN,
);

export { client };
