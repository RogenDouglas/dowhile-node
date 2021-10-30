import prismaCliente from "../prisma";

class GetLastMessagesService {
  async execute() {
    const messages = await prismaCliente.message.findMany({
      take: 3,
      orderBy: {
        created_at: "desc",
      },
      include: {
        user: true,
      },
    });

    return messages;
  }
}

export { GetLastMessagesService };
