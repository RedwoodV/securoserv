const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('announce')
		.setDescription('Send an announcement message to a specific channel')
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('The channel to send the announcement to')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('announcement')
				.setDescription('The announcement message')
				.setRequired(true)),
	async execute(interaction) {
		// Check if the user has a specific role (e.g., "staff" role)
		const staffRoleID = '962310418334883840';
		const member = interaction.member;
		if (!member.roles.cache.has(staffRoleID)) {
			return interaction.reply('You must have the staff role to use this command.');
		}

		const channel = interaction.options.getChannel('channel');
		const announcement = interaction.options.getString('announcement');
		const author = interaction.user.username;

		const embed = {
			color: 0xFF5733,
			title: 'Announcement',
			description: announcement,
			footer: {
				text: `Announced by ${author}`,
			},
		};

		// Send the embed to the specified channel
		await channel.send({ embeds: [embed] });
		// Reply to the user indicating the announcement was sent
		await interaction.reply(`Announcement sent to ${channel}`);
	},
};
