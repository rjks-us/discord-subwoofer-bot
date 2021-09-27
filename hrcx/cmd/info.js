const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    syntax: 'info',
    dev: false,
    data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Shows you current informations about the Subwoofer-Bot'),
	async execute(interaction) {
        return interaction.reply('Hello!');
	},
};