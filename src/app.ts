import express, { Request, Response, NextFunction } from 'express';

const app = express();

const SERVER_PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.enable('trust proxy');
app.use('/api', require('./routes/apiRoutes').apiRoutes);

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  console.error(`Internal Server Error ${JSON.stringify(err)}`);
  if (res.headersSent) return next(err);
  return res.status(500).send();
});

app.listen(SERVER_PORT, () => {
  console.log(`Express server started at ${SERVER_PORT}`);
});
