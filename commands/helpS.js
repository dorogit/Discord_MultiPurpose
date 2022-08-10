const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Replies with info of the bot'),
	async execute({interaction}) {
		await interaction.reply(`Successor to Ahobot. You can view the slash commands by typing /. Prefix is '.' for Message commands, which are: spam`);
	},
};