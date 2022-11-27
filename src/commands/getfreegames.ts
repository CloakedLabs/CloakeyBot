import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { getGames } from "epic-free-games";
import GameCard from '../lib/GameCard';
import Publisher from '../lib/Publishers/Publisher';



module.exports = {
	data: new SlashCommandBuilder()
		.setName('get-free-games')
		.setDescription('Get current and coming free games on epic games!'),
    //@ts-ignore
	async execute(interaction) {
		let replies : EmbedBuilder[] = [];
        getGames("GB", true).then(async res => {
            let allGames = [...res.currentGames, ...res.nextGames];
			let gameCards : EmbedBuilder[] = [];
			allGames.forEach(freeGame => {
				let tempGameCard = new GameCard(freeGame.title, freeGame.description, freeGame.keyImages[0].url, new Publisher("https://cdn2.unrealengine.com/Unreal+Engine%2Feg-logo-filled-1255x1272-0eb9d144a0f981d1cbaaa1eb957de7a3207b31bb.png", "Epic Games", "https://store.epicgames.com/en-US/browse?sortBy=releaseDate&sortDir=DESC&priceTier=tierFree&category=Game&count=40&start=0"))
				gameCards = [...gameCards, tempGameCard.getEmbed()]
			});
            replies = gameCards;
			await interaction.reply("Coming right up...");
			gameCards.forEach(async game => {
				await interaction.followUp({ embeds: [game]});
			});
          }).catch(err => {
            // Do something
          });

	},
};
