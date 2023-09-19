const { SlashCommandBuilder } = require('discord.js');
const oneLinerJoke = require('one-liner-joke');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('joke')
		.setDescription('Tells a random funny joke'),
	execute(interaction) {
		try {
			const getRandomJoke = oneLinerJoke.getRandomJoke();
			const jokeText = getRandomJoke.body;

			interaction.reply(jokeText);
		}
		catch (error) {
			console.error('Error fetching joke:', error);
			interaction.reply('Oops, something went wrong while fetching the joke.');
		}
	},
};
