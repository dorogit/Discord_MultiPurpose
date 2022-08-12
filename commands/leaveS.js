const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("leave")
        .setDescription("The bot leaves from the channel."),
	execute: async ({ client, interaction }) => {

        // Get the current queue
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue)
		{
			await interaction.reply("I'm not in a voice channel")
			return;
		} 

		queue.destroy();
        // Deletes all the songs from the queue and exits the channel
		await interaction.reply("Why you do this to me? :(")
	},
}