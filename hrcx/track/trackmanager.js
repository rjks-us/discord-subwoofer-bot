const sessions = [];

const startSession = async (pClient, pGuild, pChannel, pConfig) => {
    if(pGuild === undefined || pChannel === undefined) return;

    if(pConfig === undefined) pConfig = {queue:[], loop: false, shuffle: false}

    sessions.push({
        guild: pGuild,
        config: pConfig
    });
}

const findSession = async (guild) => {

}

const endSession = async (guild) => {

}

const addTrack = (guild, track) => {
    return new Promise(async (resolve, rejects) => {
        var session = await findSession(guild);
        if(!sessions) rejects('Could not find a session on this guild');
    
        sessions.find(elm => elm.guild === guild).config.queue.push(track);
        resolve();
    });
}

const clearTracks = (guild, track) => {
    return new Promise(async (resolve, rejects) => {
        var session = await findSession(guild);
        if(!sessions) rejects('Could not find a session on this guild');
    
        sessions.find(elm => elm.guild === guild).config.queue = []
        resolve();
    });
}

module.exports = {
    startSession: startSession,
    findSession: findSession,
    endSession: endSession
}