import { SlashCommandBuilder } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
    //@ts-ignore
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};
