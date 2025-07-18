import {
  ChannelType,
  MessageReaction,
  PermissionFlagsBits,
  User,
} from "discord.js";
import { createTicketChannel } from "../../utils/channels.js";
import { createTicketEmbed } from "../../utils/embeds.js";

export default async (reaction: MessageReaction, user: User) => {
  try {
    if (!reaction.message.inGuild()) return; // just to remove partial message type [message is in guild hence cached]
    if (reaction.partial) await reaction.fetch();

    const {
      message: { channel, author, guild },
      emoji,
    } = reaction;

    if (channel.type !== ChannelType.PublicThread) return;

    if (channel.parentId !== process.env.FORUM_CHANNEL_ID) return;

    if (user.id !== channel.ownerId) return;

    if (author.id === channel.ownerId) return;

    if (emoji.name !== "🤝") return;

    const ticket = await createTicketChannel(guild, user, author);
    const originalMessage = await channel
      .fetchStarterMessage()
      .catch(console.log);

    console.log(reaction.message);
    console.log(channel);
    console.log(originalMessage);

    const embed = createTicketEmbed(channel);
    const content = `Hey ${user} (buyer) and ${author} (seller).\n**Original Message**:\n${
      originalMessage?.content || "Not found"
    }`;

    await ticket.send({ content, embeds: [embed] });

    await channel.setName(`${channel.name} [INACTIVE]`);
    await channel.setLocked(true);

    await originalMessage?.react("🔒");
  } catch (error) {
    console.log(error);
  }
};
