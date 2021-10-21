import "dotenv/config";
import express, { Request, Response } from "express";

import { routes } from "./routes";

const app = express();

app.use(express.json());

app.use(routes);

app.get("/github", (request: Request, response: Response) => {
  response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

app.get("/signin/callback", (request: Request, response: Response) => {
  const { code } = request.query;

  response.json(code);
});

app.listen("4000", () => console.log("Server is running in port 4000"));
