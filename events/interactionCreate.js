const { slashCommands } = require('../index');
const client = require('../index')

module.exports = {
	name: 'interactionCreate',
  once:false,
	execute(interaction) {
      if (!interaction.isChatInputCommand()) return;
  
      const command = client.slashCommands.get(interaction.commandName)
      if (!command) return;
  
      try {
         command.execute({client, interaction});
      } catch (error) {
        console.error(error);
        interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
	},
};
