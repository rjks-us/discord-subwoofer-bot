const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    syntax: 'info',
    dev: false,
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Shows you current informations about the Subwoofer-Bot'),
    async execute(interaction) {
        return interaction.reply({content: `:saxophone: Bot online since ${require('../bot').startup} on version ${require('../../config.json').version}`, ephemeral: true});
    },
};