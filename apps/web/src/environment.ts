import { load } from 'ts-dotenv';

export const environment = load({
  DISCORD_GUILD_ID: String,

  DISCORD_COMMUNITY_MANAGER_ROLE_ID: String,
  DISCORD_CONTENT_SQUAD_ROLE_ID: String,
  DISCORD_DEVELOPER_ROLE_ID: String,
  DISCORD_MODDING_RESEARCHER_ROLE_ID: String,
});
