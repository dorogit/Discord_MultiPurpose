const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('creator')
		.setDescription('Shows the creator of this bot'),
	async execute({interaction}) {
		await interaction.reply('Made by <@681151593064038494> with love');
	},
};