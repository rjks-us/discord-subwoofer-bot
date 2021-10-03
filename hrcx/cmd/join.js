const { SlashCommandBuilder } = require('@discordjs/builders');
const voice = require('@discordjs/voice');

const track = require('../track/trackmanager');

module.exports = {
    syntax: 'join',
    dev: false,
    data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Lets the bot join your voice channel!'),
	async execute(interaction) {
        const vc = interaction.member.voice.channel;

        if(!vc) return interaction.reply({content: ':name_badge: You have to be in a voice channel to execute this command.', ephemeral: true,});

        const perm = vc.permissionsFor(interaction.client.user);
        if(!perm.has('CONNECT') || !perm.has('SPEAK')) return interaction.reply({content: ':name_badge: I do not have the permission to connect or speak in your channel.', ephemeral: true,});

        await track.join(vc.guild, vc);

        return interaction.reply({content: ':inbox_tray: I have successfully connected to your voice channel!', ephemeral: true});
	},
};