const { REST, Routes } = require('discord.js');
require('dotenv/config');
const fs = require('node:fs');

const commands = [];
// Grab all the command files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Grab the SlashCommandBuilder#toJSON() output for deployment
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// Construct + prepare instance of the REST module
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

//deploys commands
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		//refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENTID, process.env.GUILDID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		//catches error's
		console.error(error);
	}
})();