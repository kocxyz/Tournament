import { load } from 'ts-dotenv';

export const environment = load({
  DISCORD_GUILD_ID: String,

  DISCORD_COMMUNITY_MANAGER_ROLE_ID: String,
  DISCORD_CONTENT_SQUAD_ROLE_ID: String,
  DISCORD_FOUNDER_ROLE_ID: String,
  DISCORD_MODDING_RESEARCHER_ROLE_ID: String,
  DISCORD_SERVER_HOSTER_ROLE_ID: String,
  DISCORD_SERVER_BOOSTER_ROLE_ID: String,
});
