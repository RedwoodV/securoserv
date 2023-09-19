const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Make the bot say something')
		.addStringOption(option =>
			option.setName('message')
				.setDescription('The message to be said')
				.setRequired(true)),
	async execute(interaction) {
		// Check if the user has a specific role (e.g., "staff" role)
		const staffRoleID = '962310418334883840';
		const member = interaction.member;
		if (!member.roles.cache.has(staffRoleID)) {
			return interaction.reply('You must have the staff role to use this command.');
		}

		const message = interaction.options.getString('message');

		// Reply with the specified message
		await interaction.reply(message);
	},
};
