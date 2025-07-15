import { Guild, PermissionFlagsBits, TextChannel, User } from "discord.js";

export const createTicketChannel = async (
  guild: Guild,
  buyer: User,
  seller: User
): Promise<TextChannel> => {
  const channel = await guild.channels.create({
    name: buyer.displayName,
    parent: process.env.TICKET_CATEGORY_ID,
    permissionOverwrites: [
      { id: guild.roles.everyone.id, deny: PermissionFlagsBits.ViewChannel },
      {
        id: seller.id,
        allow: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.SendMessages,
        ],
      },
      {
        id: buyer.id,
        allow: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.SendMessages,
        ],
      },
    ],
  });

  return channel;
};
