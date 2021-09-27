const { SlashCommandBuilder } = require('@discordjs/builders');
const voice = require('@discordjs/voice');

const track = require('../track/trackmanager');

module.exports = {
    syntax: 'leave',
    dev: false,
    data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('Lets the bot leave your voice channel!'),
	async execute(interaction) {
        const vc = interaction.member.voice.channel;

        if(!vc) return interaction.reply({content: ':name_badge: You have to be in a voice channel to execute this command.', ephemeral: true});

        const connection = voice.getVoiceConnection(vc.guild.id);
        if(!connection) return interaction.reply({content: ':name_badge: I am not in a voice channel.', ephemeral: true});

        track.endSession(interaction.guild.id);
        if(connection) connection.destroy();

        return interaction.reply({content: ':outbox_tray: I have successfully disconnected to your voice channel!', ephemeral: true});
	},
};