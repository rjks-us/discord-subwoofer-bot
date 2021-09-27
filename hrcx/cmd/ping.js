const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    syntax: 'ping',
    dev: false,
    data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Health check of the bot'),
	async execute(interaction) {
        return interaction.reply({content: `we're all good, go ahead (${interaction.createdTimestamp - new Date().getTime()}ms)`, ephemeral: true});
	},
};