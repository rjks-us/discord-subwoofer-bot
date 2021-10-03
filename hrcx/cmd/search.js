const { SlashCommandBuilder } = require('@discordjs/builders');

const lib = require('../track/lib');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

const settings = require('../../settings/settings.json');

module.exports = {
    syntax: 'search',
    dev: false,
    data: new SlashCommandBuilder()
		.setName('search')
        .addStringOption(str => str.setName('track').setDescription('Lets you search for videos').setRequired(true))
		.setDescription('Lets the bot play a track of your choice'),
	async execute(interaction) {

        lib.searchArray(interaction.options.getString('track'), 5).then(async (vid) => {
            var i = 0, url = settings.icon;

            const row = new MessageActionRow();
		    const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setURL('https://www.youtube.com/results?search_query=' + interaction.options.getString('track').replace(' ', '+'))
                .setTitle('Search results for: ' + interaction.options.getString('track'))
                .setTimestamp()
                .setFooter('Select buttons below to add the tracks to queue', url)
                .setThumbnail(url);

            vid.forEach(element => {
                var btntype = 'PRIMARY'
                i++;

                embed.addField('`' + i + '.` ' + element.title + ' | `' + element.duration_raw + '`' , 'Published ' + element.snippet.publishedAt + ' | ' + element.views + ' views', false);
                row.addComponents(new MessageButton().setCustomId('summon-song:' + element.url).setLabel(i + '.').setStyle(btntype));
            });

            await interaction.reply({ephemeral: true, embeds: [embed], components: [row] });
        }).catch((err) => {
            console.log(err);
            return interaction.reply({content: ':name_badge: Could not find any song for ``' + interaction.options.getString('track') + '``', ephemeral: true});
        })
	},
};