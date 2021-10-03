const track = require('../track/trackmanager');
const lib = require('../track/lib');

module.exports = {
	name: 'interactionCreate',
	once: false,
	async execute(interaction) {
        if (!interaction.isButton()) return;
        
		if(interaction.customId.startsWith('summon-song:')) {

			var url = interaction.customId.replaceAll('summon-song:', '');

			const vc = interaction.member.voice.channel;

			if(!vc) return interaction.reply({content: ':name_badge: You have to be in a voice channel to execute this command.', ephemeral: true,});
	
			const perm = vc.permissionsFor(interaction.client.user);
			if(!perm.has('CONNECT') || !perm.has('SPEAK')) return interaction.reply({content: ':name_badge: I do not have the permission to connect or speak in your channel.', ephemeral: true,});

			lib.search(url).then((vid) => {

				track.play(interaction.guild, vc, vid, interaction, (result) => {
					if(result.joined && result.playing) return interaction.reply({content: ':inbox_tray: I have successfully connected to your voice channel!\n' +
						':musical_keyboard: Playing ``' + vid.title + '`` on **Youtube**', ephemeral: true});

					if(result.addedToQueue) return interaction.reply({content: ':ladder: ``' + vid.title + '`` was added to your song queue', ephemeral: true});
					
					if(result.playing) return interaction.reply({content: ':musical_keyboard: Playing ``' + vid.title + '`` on **Youtube**', ephemeral: true});
				});
				
			}).catch((err) => {
				console.log(err);
				return interaction.reply({content: ':name_badge: Could not find any song for ``' + url + '``', ephemeral: true});
			})
		}

		//console.log(interaction);

	},
};