const voice = require('@discordjs/voice');

const playYT = require('play-dl');

const sessions = [];

/**
 * @description Creates a new session or continues the new one
 * @param {Guild} guild 
 * @param {Channel} channel 
 * @param {JSON} track 
 * @param {} interaction 
 * @param {Function} callback 
 * @async
 * @returns Callback 
 */
const play = async (guild, channel, track, interaction, callback) => {

    //Already has connection and is playing
    if(isPlaying(guild)) {
        addTrack(guild, track);
        try {callback({joined: false, playing: true, addedToQueue: true})} catch (error) {console.log(error);}
        return;
    }

    if(!getConnection(guild)) await join(guild, channel);

    var config = {queue:[], audio: null, playing: false, loop: false, shuffle: false, volume: 0.5};

    if(track) config.queue.push(track);

    sessions.push({guild: guild, config: config});

    if(config.queue.length > 0) {
        await playResource(guild, config.queue[0]);
    }

    try {callback({joined: true, playing: true, addedToQueue: false})} catch (error) {console.log(error);}
}

/**
 * @description Streams resource and pipes it to discord Audio Player
 * @param {Guild} guild 
 * @param {JSON} track 
 * @async
 * @returns void
 */
const playResource = async (guild, track) => {
    
    let session = getConfig(guild).config;

    if(!track) {
        session.audio.stop();
        session.playing = false;
        return;
    }

    let connection = voice.getVoiceConnection(guild.id);

    let stream = await playYT.stream(track.url);
    //let stream = await ytdl(track.url, {filter: "audioonly"});
    
    let resource = voice.createAudioResource(stream.stream, {inputType: voice.StreamType.Arbitrary, inlineVolume: true});

    if(!getConfig(guild).config.audio) {

        session.audio = voice.createAudioPlayer({
            behaviors: {
                noSubscriber: voice.NoSubscriberBehavior.Pause,
            },
        });

        let audioPlayer = session.audio;

        await connection.subscribe(session.audio);
        
        audioPlayer.on('error', (error) => {
            console.log(error);
            stop(guild);
        })
    
        audioPlayer.on(voice.AudioPlayerStatus.Idle, () => {
            //Passes over to queue handler
            next(guild);
        });
    
        audioPlayer.on(voice.AudioPlayerStatus.Paused, () => {
            session.playing = false;
        });
    
        audioPlayer.on(voice.AudioPlayerStatus.AutoPaused, () => {
            session.playing = false;
        });
    
        audioPlayer.on(voice.AudioPlayerStatus.Buffering, () => {
            session.playing = false;
        });
    
        audioPlayer.on(voice.AudioPlayerStatus.Playing, () => {
            session.playing = true;
        });
    }

    //Triggers the next song
    session.playing = true;
    session.audio.play(resource);
}

/**
 * @description Connects to voice channel
 * @param {Guild} guild 
 * @param {Channel} channel 
 * @async
 * @returns Connection
 */
const join = async (guild, channel) => {
    var connection = voice.joinVoiceChannel({
        channelId: channel.id,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator,
        selfDeaf: false,
        selfMute: false
    });
    return connection;
}

/**
 * @description Disconnects to voice channel
 * @param {Guild} guild
 * @async
 * @returns void
 */
const quit = async (guild) => {
    if(getConnection(guild)) (await getConnection(guild)).destroy();
}

/**
 * @description Ends the current session on the server
 * @param {Guild} guild
 * @async
 * @returns void
 */
 const stop = async (guild) => {
    var config = getConfig(guild);
    if(config) config.config.audio.stop();
    
    //delete from session list
    for (let i = 0; i < sessions.length; i++) {
        if(sessions[i] === config) {
            sessions[i] = undefined;
        }
    }
}

/**
 * @description Triggers the next song
 * @param {Guild} guild
 * @async
 * @returns void
 */
 const next = async (guild) => {
    try {
        var object = getConfig(guild).config;

        if(!object.loop) object.queue.shift();

        if(hasNext(guild)) {
            playResource(guild, getConfig(guild).config.queue[0]);
        } else {
            object.audio.stop();
            object.playing = false;
            console.log('epmty');
        }
    } catch (error) {
        console.log(error);
    }
}

const getConnection = (guild) => {
    return voice.getVoiceConnection(guild.id);
}

const hasNext = async (guild) => {
    var session = sessions.find(s => s.guild.id == guild.id);
    if(!session) return false;
    return (session.config.queue.length > 0);
}

const getConfig = (guild) => {
    return sessions.find(s => s.guild.id == guild.id);
}

const isPlaying = (guild) => {
    var session = sessions.find(s => s.guild.id == guild.id);
    if(!session) return false;
    return session.config.playing;
}

const addTrack = (guild, track) => {
    var config = getConfig(guild);
    if(config) config.config.queue.push(track);
}

const clearTracks = async (guild) => {
    var config = getConfig(guild);
    if(config) config.config.queue = []
}

module.exports = {
    play: play,
    join: join,
    quit: quit,
    next: next,
    stop: stop,
    hasNext: hasNext,
    getConnection: getConnection,
    addTrack: addTrack,
    getConfig: getConfig,
    isPlaying: isPlaying,
    clearTracks: clearTracks
}