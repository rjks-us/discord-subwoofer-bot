const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    syntax: 'menu',
    dev: false,
    data: new SlashCommandBuilder()
		.setName('menu')
		.setDescription('Shows you the current menu of the existing song tray'),
	async execute(interaction) {
        const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('sw-shuffle')
					.setEmoji('🔀')
					.setStyle('PRIMARY'),
                new MessageButton()
					.setCustomId('sw-back')
					.setEmoji('⏮️')
					.setStyle('PRIMARY'),
                new MessageButton()
					.setCustomId('sw-pause')
					.setEmoji('⏸️')
					.setStyle('PRIMARY'),
                new MessageButton()
					.setCustomId('sw-next')
					.setEmoji('⏭️')
					.setStyle('PRIMARY'),
                new MessageButton()
					.setCustomId('sw-loop')
					.setEmoji('🔀')
					.setStyle('PRIMARY')
			);

		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('**Prophezeit** Bonez MC, RAF Camora')
			.setURL('https://link.rjks.us/song/123152134')
			.setDescription('Next up: ``Stan from Eminem``')
            .setThumbnail('https://cdn.discordapp.com/app-icons/558644400259858453/2137e2aa104a1d0283027b499133eda6.png?size=512');

		await interaction.reply({ephemeral: true, embeds: [embed], components: [row] });
        return;
	},
};