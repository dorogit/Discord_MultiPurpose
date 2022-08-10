const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Shows your avatar!'),
	async execute({interaction}) {
		await interaction.reply(`${interaction.user.displayAvatarURL({
      extension: "png",
      size: 512
    })}`);
	},
};