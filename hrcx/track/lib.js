const yts = require( 'yt-search' )

const search = (query) => {
    return new Promise(async (resolve, rejects) => {
        const result = await yts(query);
        if(result.videos.length == 0) return rejects('Invalid query search');
        resolve(result.videos[0]);
    });
}

module.exports = {
    search: search
}