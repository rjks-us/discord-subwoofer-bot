const { SlashCommandBuilder } = require('@discordjs/builders');

const track = require('../track/trackmanager');

module.exports = {
    syntax: 'pause',
    dev: false,
    data: new SlashCommandBuilder()
      .setName('pause')
      .setDescription('Pauses the current song'),
    async execute(interaction) {
        
        const vc = interaction.member.voice.channel;
        if(!vc) return interaction.reply({content: ':name_badge: You have to be in a voice channel to execute this command.', ephemeral: true,});

        var config = track.getConfig(interaction.guild);
        if(!config) return interaction.reply({content: `:name_badge: Not connected to voice channel`, ephemeral: true});

        if(track.isPlaying(interaction.guild)) {
            config.config.audio.pause();
            return interaction.reply({content: `:pause_button: You have paused the music`, ephemeral: true});
        } else {
            config.config.audio.unpause();
        }

        return interaction.reply({content: `:arrow_forward:  You have continued the music`, ephemeral: true});
    },
};