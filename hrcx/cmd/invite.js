const { SlashCommandBuilder } = require('@discordjs/builders');

const settings = require('../../settings/settings.json');

module.exports = {
    syntax: 'invite',
    dev: false,
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Shows you the most important links of the bot'),
    async execute(interaction) {
        return interaction.reply({content: ':heart: **Thank you for using me**, you can invite me here: ' + settings.invite, ephemeral: true});
    },
};