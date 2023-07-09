import { load } from 'ts-dotenv';

export const environment = load({
  API_HOSTNAME: {
    type: String,
    default: '0.0.0.0',
  },
  API_PORT: {
    type: Number,
    default: 3001,
  },
});
