const voice = require('@discordjs/voice');

const track = require('../track/trackmanager');
const settings = require('../../settings/settings.json');

module.exports = {
	name: 'voiceStateUpdate',
	once: false,
	execute(o, n) {
        if(o.channel === null) return;

        const oc = o.channel;
        const vs = voice.getVoiceConnection(oc.guild.id);
        if(!vs) return;

        if(oc.id != vs.joinConfig.channelId) return;

        //END SESSION FOR BOT IF NO USER IS PRESENT FOR 3 SECONDS
        oc.members.tap(collection => {
            if(collection.size != 1) return;
            setTimeout(() => {
                oc.members.tap(collection => {
                    if(collection.size != 1) return;
                    if(!vs) return

                    vs.destroy();
                    track.stop(oc.guild);
                });
            }, 1000 * settings.variables.timeout);
        });
	}
};