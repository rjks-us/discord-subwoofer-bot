const { SlashCommandBuilder } = require('@discordjs/builders');
const voice = require('@discordjs/voice');

const track = require('../track/trackmanager');
const lib = require('../track/lib');

module.exports = {
    syntax: 'skip',
    dev: false,
    data: new SlashCommandBuilder()
		  .setName('skip')
		  .setDescription('Lets you skip to the next song'),
	  async execute(interaction) {
        const vc = interaction.member.voice.channel;

        if(!vc) return interaction.reply({content: ':name_badge: You have to be in a voice channel to execute this command.', ephemeral: true,});

        const perm = vc.permissionsFor(interaction.client.user);
        if(!perm.has('CONNECT') || !perm.has('SPEAK')) return interaction.reply({content: ':name_badge: I do not have the permission to connect or speak in your channel.', ephemeral: true});

        //Search yt for provided track
        track.next(interaction.guild);
        return await interaction.reply({content: ':track_next: You skipped to the next song!', ephemeral: true})
	},
};