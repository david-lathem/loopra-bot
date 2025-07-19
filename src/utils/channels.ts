import { Guild, PermissionFlagsBits, TextChannel, User } from "discord.js";

export const createTicketChannel = async (
  guild: Guild,
  buyer: User,
  seller: User
): Promise<TextChannel> => {
  const randomFourDigits = Math.floor(1000 + Math.random() * 9000);
  const date = new Date();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const yy = String(date.getFullYear()).slice(-2);

  const channelName = `lp-${buyer.displayName}-${mm}${dd}${yy}-${randomFourDigits}`;
  const channel = await guild.channels.create({
    name: channelName,
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
