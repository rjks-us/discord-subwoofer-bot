const express = require('express');
const config = require('./config.json')

const bot = require('./hrcx/bot');

const app = express();

app.use('/', require('./webs/api'));

/**
 * @async
 * @description Executes the entry point of application
 */
const init = async () => {
    console.log(`[INFO] Application is starting...\n`);
    console.log(`[INFO] Subwoofer by Henry Hermann and Robert J. Kratz`);
    console.log(`[INFO] You found an error? https://link.rjks.us/support\n`);
    console.log(`[INFO] Date: ${new Date()}`);
}

init().then(() => {
    app.listen(config.PORT, () => {
        console.log(`[INFO] Webserver started on http://localhost:${config.PORT}`);

        //AUTO START OF THE DISCORD BOT
        if(config.CONFIG.AUTOSTART) bot.start();
    });
});