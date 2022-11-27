import { Client, Collection, Events, GatewayIntentBits, Partials } from "discord.js";
import * as dotenv from 'dotenv';
import * as fs from "fs";
import * as path from "path";
import insultKjell from "./listeners/insultKjell";
import interactionCreate from "./listeners/interactionCreate";
import ready from "./listeners/ready";


dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [
        Partials.Message, Partials.Reaction
    ],
});


//Register event behaviour
ready(client);
interactionCreate(client);
insultKjell(client);

// @ts-ignore
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
        //@ts-ignore
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}



client.login(process.env.TOKEN);