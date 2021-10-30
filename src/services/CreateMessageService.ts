import { io } from "../app";
import prismaCliente from "../prisma";

class CreateMessageService {
  async execute(text: string, user_id: string) {
    const message = await prismaCliente.message.create({
      data: {
        text,
        user_id,
      },
      include: {
        user: true,
      },
    });

    const infoWS = {
      messageText: message.text,
      messageCreated: message.created_at,
      user: {
        id: message.user_id,
        name: message.user.name,
        avatar: message.user.avatar_url,
      },
    };

    io.emit("new_message", infoWS);

    return message;
  }
}

export { CreateMessageService };
