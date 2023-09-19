const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dog')
		.setDescription('Sends a random dog picture'),
	async execute(interaction) {
		try {
			const response = await axios.get('https://dog.ceo/api/breeds/image/random');
			const dogImageUrl = response.data?.message;

			if (dogImageUrl) {
				const dogEmbed = {
					title: 'Random Dog Picture',
					image: {
						url: dogImageUrl,
					},
					color: 0x3498db,
				};

				await interaction.reply({ embeds: [dogEmbed] });
			}
			else {
				await interaction.reply('Oops, something went wrong. Unable to fetch a dog picture.');
			}
		}
		catch (error) {
			console.error('Error fetching dog picture:', error);
			await interaction.reply('Oops, something went wrong while fetching the dog picture.');
		}
	},
};
