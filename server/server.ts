import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';

const app: Application = express();
const PORT: number = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) =>
  res.status(200).sendFile(path.resolve(__dirname, '../index.html'))
);

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.resolve(__dirname, '../build')));
}

app.use('*', (req: Request, res: Response) => res.status(404).send('Error: Page not found'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
