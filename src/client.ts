import { Client, GatewayIntentBits, Partials } from "discord.js";

import registerEventsOnClient from "./utils/registrars/registerEvents.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessageReactions],
  partials: [Partials.Message, Partials.Reaction, Partials.User],
});

client.commands = [];

await registerEventsOnClient(client);

client.login(process.env.TOKEN);

export default client;
