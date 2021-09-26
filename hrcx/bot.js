const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

var running = false;

const config = require('../config.json')

const isRunning = () => {return running;}

/**
 * @description Starts the discord instance
 * @returns Promise<any>
 */
const start = () => {
    return new Promise((resolve, rejects) => {
        if(isRunning()) rejects('Bot is already online');

        client.login(config.TOKEN).then(() => {
            client.user.setPresence({ activities: [{ name: 'music 24/7' }], status: 'idle' });

            running = true;
            resolve();
        }).catch((err) => rejects(err));
    });
}

/**
 * @description Stopps the discord instance
 * @returns Promise<any>
 */
const stop = () => {
    return new Promise((resolve, rejects) => {{
        if(!isRunning()) rejects('Bot is not online');

        client.user.setStatus('invisible');
        client.destroy();
        running = false
        resolve();
    }});
}

module.exports = {
    start: start,
    stop: stop,
    client: client
}