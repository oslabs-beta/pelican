import express, { Application, Request, Response, NextFunction, urlencoded } from "express";
import path from "path";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) =>
  res.status(200).sendFile(path.resolve(__dirname, "../client/index.html"))
);

app.use("*", (req: Request, res: Response) => res.status(200).send("Error: Page not found"));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
