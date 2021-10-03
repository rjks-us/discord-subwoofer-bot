const { SlashCommandBuilder } = require('@discordjs/builders');

const { MessageActionRow, MessageEmbed} = require('discord.js');

const settings = require('../../settings/settings.json');

module.exports = {
    syntax: 'help',
    dev: true,
    data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Shows you a list of all aviable commands'),
	async execute(interaction) {

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('List of commands:')
            .setTimestamp()
            .setFooter('Bot by @rjks.us', settings.icon);
        
        interaction.client.commands.forEach(element => {
            if(!element.dev) embed.addField('/' + element.syntax , element.data.toJSON().description, true);
        });

        await interaction.reply({ephemeral: true, embeds: [embed]});
	},
};