const { SlashCommandBuilder } = require('@discordjs/builders');

const track = require('../track/trackmanager');

module.exports = {
    syntax: 'clear',
    dev: false,
    data: new SlashCommandBuilder()
      .setName('clear')
      .setDescription('Clears the current queue'),
    async execute(interaction) {

      const vc = interaction.member.voice.channel;
      if(!vc) return interaction.reply({content: ':name_badge: You have to be in a voice channel to execute this command.', ephemeral: true,});

      const config = track.getConfig(interaction.guild);
      if(!config) return interaction.reply({content: `:name_badge: Not connected to voice channel`, ephemeral: true});

      track.clearTracks(interaction.guild);

      return interaction.reply({content: `:broom: You have cleared the queue`, ephemeral: true});
    },
};