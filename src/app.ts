import "dotenv/config";
import express, { Request, Response } from "express";

import http from "http";
import { Server } from "socket.io";

import cors from "cors";

import { routes } from "./routes";

const app = express();

const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use(cors());
app.use(routes);

io.on("connection", (socket) => {
  console.log(`Usuário conectado no socket ${socket.id}`);
});

app.get("/github", (request: Request, response: Response) => {
  response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

app.get("/signin/callback", (request: Request, response: Response) => {
  const { code } = request.query;

  response.json(code);
});

export { serverHttp, io };
