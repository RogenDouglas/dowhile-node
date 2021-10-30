import { Response } from "express";

import { GetLastMessagesService } from "../services/GetLastMessagesService";

class GetLastMessagesController {
  async handle(_, response: Response) {
    const service = new GetLastMessagesService();

    try {
      const result = await service.execute();

      return response.json(result);
    } catch (error) {
      return response.json(error.message);
    }
  }
}

export { GetLastMessagesController };
