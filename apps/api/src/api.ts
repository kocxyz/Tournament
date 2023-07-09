import express from 'express';
import { manager } from 'brackets';
import { createLogger } from 'logging';
import { environment } from './environment';

const logger = createLogger('api');
const app = express();

app.use(express.json());

app.get('/api/tournament/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const tournamentData = await manager.get.tournamentData(id);
  res.json(tournamentData);
});

app.listen(environment.API_PORT, environment.API_HOSTNAME, () =>
  logger.info(`Listening on ${environment.API_HOSTNAME}:${environment.API_PORT}!`),
);
