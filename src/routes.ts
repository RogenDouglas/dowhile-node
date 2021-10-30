import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { GetLastMessagesController } from "./controllers/GetLastMessagesController";
import { ProfileUserController } from "./controllers/ProfileUserController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const routes = Router();

routes.post("/authenticate", new AuthenticateUserController().handle);

routes.post(
  "/messages",
  ensureAuthenticated,
  new CreateMessageController().handle
);

routes.get("/messages/last", new GetLastMessagesController().handle);

routes.get(
  "/user/profile",
  ensureAuthenticated,
  new ProfileUserController().handle
);

export { routes };
