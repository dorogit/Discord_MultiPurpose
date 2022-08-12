const { SlashCommandBuilder,VoiceState } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Replies with info'),
	async execute({interaction}) {
		await interaction.reply(VoiceState.length);
	},
};