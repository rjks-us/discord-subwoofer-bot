const { SlashCommandBuilder } = require('@discordjs/builders');
const voice = require('@discordjs/voice');

const track = require('../track/trackmanager');
const lib = require('../track/lib');

module.exports = {
    syntax: 'play',
    dev: false,
    data: new SlashCommandBuilder()
		.setName('play')
        .addStringOption(str => str.setName('track').setDescription('Enter your search query, spotify track-id or soundcloud url').setRequired(true))
		.setDescription('Lets the bot play a track oof your choice'),
	async execute(interaction) {
        const vc = interaction.member.voice.channel;

        if(!vc) return interaction.reply({content: ':name_badge: You have to be in a voice channel to execute this command.', ephemeral: true,});

        const perm = vc.permissionsFor(interaction.client.user);
        if(!perm.has('CONNECT') || !perm.has('SPEAK')) return interaction.reply({content: ':name_badge: I do not have the permission to connect or speak in your channel.', ephemeral: true,});

        //Search yt for provided track
        lib.search(interaction.options.getString('track')).then((vid) => {

            //Prevent laging when playing
            if(track.isPlaying(interaction.guild)) {
                track.addTrack(interaction.guild, vid);
                return interaction.reply({content: ':ladder: ``' + vid.title + '`` from ' + vid.author.name + ' was added to your song queue', ephemeral: true});
            }

            track.play(interaction.guild, vc, vid, interaction, (result) => {

                if(result.joined && result.playing) return interaction.reply({content: ':inbox_tray: I have successfully connected to your voice channel!\n' +
						':musical_keyboard: Playing ``' + vid.title + '`` from ' + vid.author.name, ephemeral: true});

                if(result.addedToQueue) return interaction.reply({content: ':ladder: ``' + vid.title + '`` from ' + vid.author.name + ' was added to your song queue', ephemeral: true});
                
                if(result.playing) return interaction.reply({content: ':musical_keyboard: Playing ``' + vid.title + '`` from ' + vid.author.name, ephemeral: true});
            });
            
        }).catch((err) => {
            console.log(err);
            return interaction.reply({content: ':name_badge: Could not find any song for ``' + interaction.options.getString('track') + '``', ephemeral: true});
        })
	},
};