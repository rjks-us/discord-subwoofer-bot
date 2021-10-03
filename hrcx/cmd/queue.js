const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed} = require('discord.js');

const track = require('../track/trackmanager');
const settings = require('../../settings/settings.json');

module.exports = {
  syntax: 'queue',
  dev: false,
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Shows you the current queue of the bot'),
  async execute(interaction) {
      var i = 0, url = settings.icon;

      const vc = interaction.member.voice.channel;
        if(!vc) return interaction.reply({content: ':name_badge: You have to be in a voice channel to execute this command.', ephemeral: true,});

      const config = track.getConfig(interaction.guild);
      if(!config) return interaction.reply({content: `:name_badge: Not connected to voice channel`, ephemeral: true});

      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Queue for your session')
        .setTimestamp()
        .setThumbnail(url);

      track.getConfig(interaction.guild).config.queue.forEach(element => {
        i++;
          //Catch first element
          if(i == 1 && i <= 10) {
            url = element.thumbnail;
          };
          embed.addField('`' + i + '.` ' + element.title + ' | `' + element.timestamp + '`' , 'From ' + element.author.name + ' published ' + element.ago + ' | ' + element.views + ' views', false);
      });
      embed.setFooter('You have ' + i + ' songs in the queue', url);

      await interaction.reply({ephemeral: true, embeds: [embed]});
  },
};