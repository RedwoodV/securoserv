const { SlashCommandBuilder } = require('@discordjs/builders');
const { createAudioPlayer, createAudioResource, joinVoiceChannel } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play audio from a YouTube link')
		.addStringOption(option =>
			option.setName('url')
				.setDescription('The URL of the YouTube video')
				.setRequired(true)),
	async execute(interaction) {
		const url = interaction.options.getString('url');
		const member = interaction.member;
		const channel = member.voice.channel;

		if (!channel) {
			return interaction.reply('You must be in a voice channel to use this command.');
		}

		try {
			const connection = joinVoiceChannel({
				channelId: channel.id,
				guildId: interaction.guild.id,
				adapterCreator: interaction.guild.voiceAdapterCreator,
			});

			const stream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });
			const resource = createAudioResource(stream);

			const audioPlayer = createAudioPlayer();
			audioPlayer.play(resource);
			connection.subscribe(audioPlayer);

			await interaction.reply(`Now playing audio from: ${url}`);
		}
		catch (error) {
			console.error(error);
			await interaction.reply('An error occurred while trying to play audio.');
		}
	},
};
