import { EmbedBuilder, PublicThreadChannel } from "discord.js";

export const createTicketEmbed = (
  channel: PublicThreadChannel
): EmbedBuilder => {
  const embed = new EmbedBuilder()
    .setColor("Green")
    .setTitle("🎫 Ticket Opened")
    .setDescription(
      `In ligh of the request ${channel.url}.\nSupport will be with you shortly.`
    )
    .setThumbnail(channel.guild.iconURL());

  return embed;
};
