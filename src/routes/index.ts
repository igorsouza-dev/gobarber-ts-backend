import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

import authMiddleware from '../middlewares/auth';

const routes = Router();

routes.get('/', (request, response) =>
  response.json({ message: 'Hello world' }),
);

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);

routes.use(authMiddleware);
routes.use('/appointments', appointmentsRouter);

export default routes;
