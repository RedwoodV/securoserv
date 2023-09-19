const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cat')
		.setDescription('Sends a random cat picture'),
	async execute(interaction) {
		try {
			const response = await axios.get('https://api.thecatapi.com/v1/images/search');
			const catImageUrl = response.data[0]?.url;

			if (catImageUrl) {
				const catEmbed = {
					title: 'Random Cat Picture',
					image: { url: catImageUrl },
					color: 0xFF5733,
				};

				await interaction.reply({ embeds: [catEmbed] });
			}
			else {
				await interaction.reply('Oops, something went wrong. Unable to fetch a cat picture.');
			}
		}
		catch (error) {
			console.error('Error fetching cat picture:', error);
			await interaction.reply('Oops, something went wrong while fetching the cat picture.');
		}
	},
};
