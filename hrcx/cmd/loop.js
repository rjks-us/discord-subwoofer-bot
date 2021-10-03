const { SlashCommandBuilder } = require('@discordjs/builders');
const voice = require('@discordjs/voice');

const track = require('../track/trackmanager');
const lib = require('../track/lib');

module.exports = {
    syntax: 'loop',
    dev: false,
    data: new SlashCommandBuilder()
		.setName('loop')
		.setDescription('Lets the bot play a track oof your choice'),
	async execute(interaction) {
        const vc = interaction.member.voice.channel;
        if(!vc) return interaction.reply({content: ':name_badge: You have to be in a voice channel to execute this command.', ephemeral: true});

        const config = track.getConfig(interaction.guild);
        if(!config) return interaction.reply({content: `:name_badge: Not connected to voice channel`, ephemeral: true});

        var loop = track.getConfig(interaction.guild).config.loop;

        if(!loop) {
            interaction.reply({content: `:loop: You have enabled the loop`, ephemeral: true});
            track.getConfig(interaction.guild).config.loop = true;
        } else {
            interaction.reply({content: `:loop: You have disabled the loop`, ephemeral: true});
            track.getConfig(interaction.guild).config.loop = false;
        }
	},
};