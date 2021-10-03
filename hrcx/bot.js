const { Client, Intents, Collection } = require('discord.js');

const {TOKEN, APPLICATIONID} = require('../config.json')

const Discord = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const rest = new REST({ version: '9' }).setToken(TOKEN);

const fs = require('fs')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_VOICE_STATES] });

var running = false;
var startup = new Date();;

const isRunning = () => {return running;}

/**
 * @description Starts the discord instance
 * @returns Promise<any>
 */
const start = () => {
    return new Promise((resolve, rejects) => {
        if(isRunning()) rejects('Bot is already online');

        client.login(TOKEN).then(() => {
            client.user.setPresence({ activities: [{ name: 'music 24/7' }], status: 'idle' });

            running = true;

            //REGISTER SLASH COMMANDS
            var i = 0;
            client.guilds.cache.forEach(guilds => {
                rest.put(Routes.applicationGuildCommands(APPLICATIONID, guilds.id), { body: commands }).then(i++).catch((err) => {
                    //console.error(err)
                });
            });
            console.log(`[INFO] Successfully registered application commands on ${i} servers.`);

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

/**
 * Event Handler
 */

const eventFiles = fs.readdirSync(__dirname + '/event').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./event/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
    //console.log(`[INFO] Loaded Command Handler ${file} successfully`);
}

/**
 * Command Handler
 */

client.commands = new Collection();
const commandFiles = fs.readdirSync(__dirname + '/cmd').filter(file => file.endsWith('.js'));
const commands = [];
 
for(const file of commandFiles) {
    const command = require(`./cmd/${file}`);
    if(command.data === undefined) {
        console.log('[ERROR] Could not load command ' + file + ', please check syntax');
    } else {
        client.commands.set(command.data.name, command);
    }
    //console.log(`[INFO] Loaded Command ${file} successfully`);
}

for (const file of commandFiles) {
	const command = require(`./cmd/${file}`);
	commands.push(command.data.toJSON());
}

module.exports = {
    start: start,
    stop: stop,
    client: client,
    isRunning: isRunning,
    startup: startup
}