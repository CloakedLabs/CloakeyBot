import { REST, Routes } from "discord.js"
import * as dotenv from 'dotenv';
import * as fs from "fs";
import * as path from "path";
dotenv.config();

const commands = [];
// Grab all the command files from the commands directory you created earlier
// @ts-ignore
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.ts'));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	const command = require(`./src/commands/${file}`);
	commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN!);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENTID!, process.env.GUILDID!),
			{ body: commands },
		);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
